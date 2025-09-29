import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <>
      <div className="container text-center" style={{ paddingTop: "150px" }}>
        <img
          src="/images/Memoji.webp"
          alt="Memoji of Amit"
          className="img-fluid rounded"
          style={{ maxWidth: "250px" }}
        />
        <h1 className="display-1">404</h1>
        <h2>Page Not Found</h2>
        <p className="lead text-secondary">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link to="/" className="btn btn-outline-secondary mt-3">
          <i className="bi bi-arrow-left me-2"></i>
          Go Back to Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
