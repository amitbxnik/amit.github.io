import { useEffect, useRef } from "react";
import { skillsData } from "../components/Data";

const Skills = () => {
  const scrollerInnerRef = useRef<HTMLDivElement>(null);
  const inactivityTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const scroller = scrollerInnerRef.current;
    if (!scroller) return;

    const parentContainer = scroller.parentElement;
    if (!parentContainer) return;

    const handleManualScroll = () => {
      scroller.style.animationPlayState = "paused";

      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }

      inactivityTimerRef.current = window.setTimeout(() => {
        scroller.style.animationPlayState = "running";
      }, 2000);
    };

    parentContainer.addEventListener("scroll", handleManualScroll);

    return () => {
      parentContainer.removeEventListener("scroll", handleManualScroll);
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="container py-4" style={{ maxWidth: "900px" }}>
      <h1 className="mb-4">Skills</h1>

      <div className="scroller">
        <div className="scroller-inner" ref={scrollerInnerRef}>
          {skillsData.map((skill, index) => (
            <div
              key={index}
              className="d-flex flex-column align-items-center justify-content-center flex-shrink-0 text-center"
              style={{ width: "80px" }}
            >
              <div
                className="rounded-3 d-flex align-items-center justify-content-center mb-2"
                style={{
                  backgroundColor: skill.color,
                  width: "48px",
                  height: "48px",
                }}
              >
                <i
                  className={`bi ${skill.icon}`}
                  style={{
                    fontSize: "24px",
                    color:
                      skill.color === "#F7DF1E" || skill.color === "#000000"
                        ? "#000"
                        : "#fff",
                  }}
                ></i>
              </div>
              <h6 className="mb-1 fw-semibold" style={{ fontSize: "0.8rem" }}>
                {skill.name}
              </h6>
            </div>
          ))}
          {skillsData.map((skill, index) => (
            <div
              key={`duplicate-${index}`}
              className="d-flex flex-column align-items-center justify-content-center flex-shrink-0 text-center"
              style={{ width: "80px" }}
              aria-hidden="true"
            >
              <div
                className="rounded-3 d-flex align-items-center justify-content-center mb-2"
                style={{
                  backgroundColor: skill.color,
                  width: "48px",
                  height: "48px",
                }}
              >
                <i
                  className={`bi ${skill.icon}`}
                  style={{
                    fontSize: "24px",
                    color:
                      skill.color === "#F7DF1E" || skill.color === "#000000"
                        ? "#000"
                        : "#fff",
                  }}
                ></i>
              </div>
              <h6 className="mb-1 fw-semibold" style={{ fontSize: "0.8rem" }}>
                {skill.name}
              </h6>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
