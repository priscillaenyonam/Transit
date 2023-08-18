import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Confitg/DatabaseConfig";

const Navbar = ({ name, photo }) => {
  const navigate = useNavigate();

  const logOut = () => {
    auth.signOut();
    return navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-transparent">
      <div className="container-fluid align-items-center">
        <Link to="/" className="navbar-brand ">
          TranSit
        </Link>
        <button
          className="navbar-toggler border-none border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page">
                {name}
              </a>
            </li>

            <li className="nav-item dropdown ">
              <a
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={photo}
                  alt="profile"
                  width="35px"
                  height="35px"
                  className="rounded-5 border border-2"
                />
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/bookride" className="dropdown-item">
                    Book a Ride
                  </Link>
                </li>
                <li>
                  <Link to="/becomerider" className="dropdown-item">
                    Become a Rider
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <h6 className="dropdown-item" onClick={logOut}>
                    Log Out
                  </h6>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
