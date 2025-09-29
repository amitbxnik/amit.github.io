import { useState } from "react";
import {
  workExperience,
  educationExperience,
  AccordionItemProps,
  ExperienceAccordionProps,
  WorkExperience,
  EducationExperience,
} from "../components/Data";

const AccordionItem = ({ item, index, type }: AccordionItemProps) => {
  const isWork = type === "work";
  const title = isWork
    ? (item as WorkExperience).company
    : (item as EducationExperience).institution;
  const subtitle = isWork
    ? (item as WorkExperience).title
    : (item as EducationExperience).degree;
  const details = isWork
    ? (item as WorkExperience).responsibilities
    : (item as EducationExperience).information;
  const targetId = `${type}-${item.id}`;

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading-${targetId}`}>
        <button
          className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse-${targetId}`}
          aria-expanded={index === 0 ? "true" : "false"}
          aria-controls={`collapse-${targetId}`}
        >
          <div className="d-flex w-100 align-items-center">
            <img
              className="rounded-circle me-3"
              src={item.image}
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
              alt={title}
            />
            <div className="flex-grow-1">
              <h6 className="mb-0">{title}</h6>
              <small className="text-muted d-block">{subtitle}</small>
              <small className="text-muted">
                {item.period} · {item.location}
              </small>
            </div>
          </div>
        </button>
      </h2>
      <div
        id={`collapse-${targetId}`}
        className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
        aria-labelledby={`heading-${targetId}`}
      >
        <div className="accordion-body pb-1">
          <ul>
            {details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ExperienceAccordion = ({ items, type }: ExperienceAccordionProps) => (
  <div className="card">
    <div className="accordion accordion-flush" id={`${type}Accordion`}>
      {items.map((item, index) => (
        <AccordionItem key={item.id} item={item} index={index} type={type} />
      ))}
    </div>
  </div>
);

const Experience = () => {
  const [active, setActive] = useState("experience");

  const setActiveTab = (tab: "experience" | "education") => {
    setActive(tab);
  };

  return (
    <div className="container pt-2 pb-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8">
          <div className="btn-group w-100 mb-3" role="group">
            <button
              type="button"
              className={`btn btn-outline-secondary ${
                active === "experience" ? "active" : ""
              }`}
              onClick={() => setActiveTab("experience")}
            >
              Experience
            </button>
            <button
              type="button"
              className={`btn btn-outline-secondary ${
                active === "education" ? "active" : ""
              }`}
              onClick={() => setActiveTab("education")}
            >
              Education
            </button>
          </div>
          {active === "experience" ? (
            <ExperienceAccordion items={workExperience} type="work" />
          ) : (
            <ExperienceAccordion items={educationExperience} type="education" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Experience;
