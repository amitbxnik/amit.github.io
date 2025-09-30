const Hero = () => {
  return (
    <>
      <div className="container w-75 pt-4 pb-4">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-5 col-md-6 text-center mt-3 mt-lg-0 pb-4">
            <img
              src="/images/IMG_6322.webp"
              alt="Amit Banik"
              className="img-fluid rounded"
              style={{ maxWidth: "220px" }}
            />
          </div>

          <div className="col-lg-6 col-md-6 text-center text-lg-start">
            <h1 className="mb-0">Amit Banik</h1>
            <h3 className="mb-3 mt-n2 text-body-secondary">(uh-mit ban-ik)</h3>
            <h2 className="mb-3">
              Undergraduate Computer Science & Engineering Student
            </h2>
            <div className="d-flex align-items-center justify-content-center justify-content-lg-start">
              <i className="bi bi-geo-alt-fill"></i>
              <h3 className="mb-0 ms-2">Torrington, CT, USA</h3>
            </div>

            <div className="d-flex justify-content-center justify-content-lg-start align-items-center gap-3 no-link-color pt-4">
              <a
                href="/Amit_Banik_SWE_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-secondary"
                role="button"
              >
                <i className="me-2 bi bi-file-earmark-person-fill"></i>
                Resume
              </a>
              <div className="d-flex gap-3">
                <a
                  href="https://www.linkedin.com/in/amit-banik/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
                <a
                  href="https://github.com/amitbxnik"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-github"></i>
                </a>
                <a href="mailto:amitban2205@gmail.com">
                  <i className="bi bi-envelope-at-fill"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Hero;
