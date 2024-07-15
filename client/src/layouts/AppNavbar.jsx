import { Navbar } from "react-bootstrap";
import FavIcon32 from "../assets/logo/favicon-32x32.png";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

export const AppNavbar = () => {
  const { quantity } = useSelector((state) => state.bookmark);

  return (
    <Navbar
      className="navbar bg-purple navbar-expand-lg"
      bg="dark"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={FavIcon32} alt="Logo" className="img-fluid" />
          Blogify
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blogs">
                Blogs
              </Link>
            </li>
          </ul>
          <div>
            <Link className="btn btn-outline-light m-1" to="/login">
              <i className="fa fa-sign-in fa-lg"></i>
            </Link>
            <Link className="btn btn-outline-light" to="/bookmark">
              <i className="fa fa-bookmark fa-lg"></i> {quantity}
            </Link>
          </div>
        </div>
      </div>
    </Navbar>
  );
};
