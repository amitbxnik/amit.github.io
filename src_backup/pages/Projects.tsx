import { projectData } from "../components/Data";
import { Link } from "react-router-dom";

const Projects = () => {
  const featuredProjects = projectData.filter((project) => project.featured);

  return (
    <div className="container py-3 py-md-4" style={{ maxWidth: "900px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0 fs-2 fs-md-1">Featured Projects</h1>
        <Link to="/projects" className="btn btn-outline-secondary btn-sm">
          <span>View All</span>
          <i className="bi bi-arrow-right ms-1"></i>
        </Link>
      </div>

      <div
        className="d-flex gap-3 overflow-auto pb-3"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {featuredProjects.map((project) => (
          <div
            key={project.id}
            className="card flex-shrink-0 shadow-sm"
            style={{
              width: "clamp(260px, 70vw, 300px)",
              scrollSnapAlign: "start",
            }}
          >
            <img
              src={project.image}
              className="card-img-top"
              alt={project.title}
              style={{
                objectFit: "cover",
                cursor: "pointer",
                height: "160px",
              }}
              onClick={() => window.open(project.image, "_blank")}
            />
            <div className="card-body d-flex flex-column p-3">
              <div className="text-center mb-2">
                <h5 className="card-title mb-1 fs-6 fs-md-5">
                  {project.title}
                </h5>
              </div>

              <p
                className="card-text text-muted flex-grow-1 mb-3"
                style={{ fontSize: "0.85rem", lineHeight: "1.4" }}
                dangerouslySetInnerHTML={{ __html: project.description }}
              />

              <div className="mt-auto">
                {project.projectLinks && project.projectLinks.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {project.projectLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-dark btn-sm"
                        style={{ fontSize: "0.8rem" }}
                      >
                        <i className={`${link.icon} me-1`}></i>
                        {link.text}
                      </a>
                    ))}
                  </div>
                )}

                <div className="d-flex flex-wrap gap-1">
                  {project.tags &&
                    project.tags.length > 0 &&
                    project.tags.slice(0, 6).map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="badge bg-secondary"
                        style={{ fontSize: "0.7rem" }}
                      >
                        {tag}
                      </span>
                    ))}
                  {project.tags && project.tags.length > 6 && (
                    <span
                      className="badge bg-light text-muted"
                      style={{ fontSize: "0.7rem" }}
                    >
                      +{project.tags.length - 6}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .container {
            width: 95% !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;
