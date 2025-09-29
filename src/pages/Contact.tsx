import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const formspreeUrl = import.meta.env.VITE_FORMSPREE_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  const [sendCopy, setSendCopy] = useState(false);

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (value) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: !formData.name,
      email: !formData.email,
      message: !formData.message,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((isError) => isError);
  };

  const handleResetForm = () => {
    setFormData({ name: "", email: "", message: "" });
    setSendCopy(false);
    setStatus("idle");
    setErrors({ name: false, email: false, message: false });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("submitting");

    const submissionData = {
      ...formData,
      ...(sendCopy && { _cc: formData.email }),
    };

    try {
      const response = await fetch(formspreeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        const errorData = await response.json();
        console.error("Form submission error:", errorData);
        setStatus("error");
      }
    } catch (error) {
      console.error("Network or other error:", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="container py-5 w-50 text-center">
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">Thank You!</h4>
          <p>
            Your message has been sent successfully. I'll get back to you as
            soon as possible!
          </p>
          <hr />
          <div className="d-flex justify-content-center gap-3">
            <button onClick={() => navigate("/")} className="btn btn-dark">
              <i className="bi bi-house-fill me-2"></i>Return Home
            </button>
            <button
              onClick={handleResetForm}
              className="btn btn-outline-secondary"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container py-3 py-md-5 px-4">
        <div style={{ margin: "0 auto" }}>
          <div className="mb-3 mb-md-5">
            <h1 className="fs-2 fs-md-1">Contact Me</h1>
          </div>

          <div className="row g-3 g-md-4">
            <div className="col-12">
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      Please enter your name.
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      Please enter a valid email address.
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <textarea
                    className={`form-control ${
                      errors.message ? "is-invalid" : ""
                    }`}
                    id="message"
                    name="message"
                    placeholder="For feedback, career opportunities, or just to say hello :)"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                  {errors.message && (
                    <div className="invalid-feedback">
                      Please enter a message.
                    </div>
                  )}
                </div>

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="sendCopy"
                    checked={sendCopy}
                    onChange={(e) => setSendCopy(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="sendCopy">
                    Send a copy of this message to my email
                  </label>
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-dark btn-lg"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
                {status === "error" && (
                  <div className="alert alert-danger mt-3">
                    Something went wrong. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
