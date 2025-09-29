import { projectData } from "../components/Data";

const AllProjects = () => {
  return (
    <>
      <div className="container py-3 py-md-5 w-75">
        <div className="mb-3 mb-md-5">
          <h1 className="fs-2 fs-md-1">All Projects</h1>
        </div>

        <div className="row g-3 g-md-4">
          {projectData.map((project) => (
            <div key={project.id} className="col-12 col-sm-6 col-lg-4">
              <div className="card h-100 shadow-sm d-flex flex-column">
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
                    {project.featured && (
                      <span className="badge bg-warning text-dark">
                        <i className="bi bi-star-fill me-1"></i>Featured
                      </span>
                    )}
                  </div>

                  <p
                    className="card-text text-muted flex-grow-1 mb-3"
                    style={{ fontSize: "0.85rem", lineHeight: "1.4" }}
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />

                  <div className="mt-auto">
                    {project.projectLinks &&
                      project.projectLinks.length > 0 && (
                        <div className="d-flex flex-column flex-sm-row gap-2 mb-3">
                          {project.projectLinks.map((link, index) => (
                            <a
                              key={index}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-dark btn-sm flex-sm-fill"
                              role="button"
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
        
        @media (max-width: 576px) {
          .card-body {
            padding: 1rem !important;
          }
          
          .card-title {
            line-height: 1.3;
          }
        }
      `}</style>
      </div>
    </>
  );
};

export default AllProjects;
