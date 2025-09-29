import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <nav className="pt-3">
        <div className="container-fluid container-md d-flex justify-content-between align-items-center">
          <ul className="navbar-nav d-flex flex-row gap-4">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/projects">
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>

          <button
            className="btn mt-2 mt-sm-0"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <i className="bi bi-moon-stars-fill"></i>
            ) : (
              <i className="bi bi-sun-fill"></i>
            )}
          </button>
        </div>
      </nav>
    </>
  );
};
export default Header;
