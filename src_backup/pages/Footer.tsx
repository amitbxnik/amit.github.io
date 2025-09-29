import "../App.css";
const Footer = () => {
  return (
    <>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column justify-content-center">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-c-circle-fill"></i>
              <p className="mb-0">{new Date().getFullYear()}</p>
            </div>
            <div className="text-center">All Rights Reserved</div>
          </div>
          <div className="d-flex align-items-center gap-3 no-link-color">
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
    </>
  );
};
export default Footer;
