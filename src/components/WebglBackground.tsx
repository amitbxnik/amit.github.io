import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";

// --- Embedded GLSL Shaders ---
const vertexShader = `
    uniform float time;
    varying vec2 vUv;
    varying float vColorRandom;
    attribute float randoms;
    attribute float colorRandoms;

    void main(){
      vUv = uv;
      vColorRandom = colorRandoms;
      vec4 mvPosition = modelViewMatrix * vec4(position,1.);
      gl_PointSize = (30. * randoms + 5.) * (1. / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
`;

const fragmentShader = `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;
    varying float vColorRandom;

    void main(){
     float alpha = 1. - smoothstep(-.2, .5, length(gl_PointCoord - vec2(.5)));
     vec3 finalColor = uColor1;
     if(vColorRandom > .33 && vColorRandom < .66){ finalColor = uColor2; }
     if(vColorRandom > .66){ finalColor = uColor3; }
     float gradient = smoothstep(.3, .7, vUv.y);
     gl_FragColor = vec4(finalColor, alpha * gradient);
    }
`;

const WebglBackground = () => {
  const { theme } = useTheme();
  const mountRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const starsMaterialRef = useRef<THREE.PointsMaterial | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    let animationFrameId: number;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      container.offsetWidth / container.offsetHeight,
      0.001,
      1000
    );
    cameraRef.current = camera;
    const updateCameraPosition = () => {
      if (window.innerWidth < 768) {
        camera.position.set(1.75, 3, 5);
      } else {
        camera.position.set(2, 3, 4);
      }
    };
    updateCameraPosition();

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    const points: number[] = [],
      uv: number[] = [];
    for (let i = 0; i < 10000; i++) {
      const y = (i / 10000 - 0.5) * 20;
      const angle = (i / 10000) * Math.PI * 10;
      points.push(Math.cos(angle) * 1.5, y, Math.sin(angle) * 1.5);
      points.push(
        Math.cos(angle + Math.PI) * 1.5,
        y,
        Math.sin(angle + Math.PI) * 1.5
      );
      uv.push(i / 10000, 0);
      uv.push(i / 10000, 1);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(points, 3)
    );
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    geometry.center();

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        uColor1: { value: new THREE.Color() },
        uColor2: { value: new THREE.Color() },
        uColor3: { value: new THREE.Color() },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    materialRef.current = material;
    const number = geometry.attributes.position.array.length;
    const randoms = new Float32Array(number / 3);
    const colorRandoms = new Float32Array(number / 3);
    for (let i = 0; i < number / 3; i++) {
      randoms.set([Math.random()], i);
      colorRandoms.set([Math.random()], i);
    }
    geometry.setAttribute("randoms", new THREE.BufferAttribute(randoms, 1));
    geometry.setAttribute(
      "colorRandoms",
      new THREE.BufferAttribute(colorRandoms, 1)
    );

    const dna = new THREE.Points(geometry, material);
    scene.add(dna);

    // --- STARFIELD CREATION ---
    const starsGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(500 * 3);
    for (let i = 0; i < 500 * 3; i++) {
      // Spread stars in a larger sphere around the DNA
      posArray[i] = (Math.random() - 0.5) * 25;
    }
    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    const starsMaterial = new THREE.PointsMaterial({
      size: 0.02, // Increased size for visibility
      color: 0xffc000, // This will be updated based on theme
    });
    starsMaterialRef.current = starsMaterial;
    const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starsMesh);

    let time = 0;
    const render = () => {
      time += 0.05;
      dna.rotation.y += 0.001;
      // Animate the stars
      starsMesh.rotation.y = time / 25;
      material.uniforms.time.value = time;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    const handleWheel = (event: WheelEvent) => {
      if (dna) dna.rotation.y += event.deltaY * 0.002;
    };
    window.addEventListener("wheel", handleWheel);

    const handleResize = () => {
      if (!container) return;
      const { offsetWidth, offsetHeight } = container;
      renderer.setSize(offsetWidth, offsetHeight);
      camera.aspect = offsetWidth / offsetHeight;
      updateCameraPosition();
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("wheel", handleWheel);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    // Check if the materials have been created yet
    if (materialRef.current && starsMaterialRef.current) {
      const lightModeColors = {
        color1: new THREE.Color("#228B22"),
        color2: new THREE.Color("#2E8B57"),
        color3: new THREE.Color("#32CD32"),
        starColor: new THREE.Color("#1565C0"),
      };
      const darkModeColors = {
        color1: new THREE.Color(0x0c0317),
        color2: new THREE.Color(0x170624),
        color3: new THREE.Color(0x00ffff),
        starColor: new THREE.Color("#E0E0E0"),
      };
      const currentColors =
        theme === "light" ? lightModeColors : darkModeColors;

      // Update DNA colors
      materialRef.current.uniforms.uColor1.value.set(currentColors.color1);
      materialRef.current.uniforms.uColor2.value.set(currentColors.color2);
      materialRef.current.uniforms.uColor3.value.set(currentColors.color3);

      // Update star color
      starsMaterialRef.current.color.set(currentColors.starColor);
    }
  }, [theme]);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    />
  );
};

export default WebglBackground;
