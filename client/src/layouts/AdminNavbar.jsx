import Favicon32 from "../assets/logo/favicon-32x32.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { removeAToken } from "../utils/session";

import Dropdown from "react-bootstrap/Dropdown";

export const AdminNavbar = () => {
  const isAdmin = JSON.parse(
    localStorage.getItem("currentUser")
  )?.role.includes("admin");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSignOut = () => {
    removeAToken();
    localStorage.removeItem("currentUser");
    navigate("/login");
  };
  return (
    <div className="col-md-3 border" style={{ maxWidth: "250px" }}>
      <div className="d-flex flex-column p-3 vh-100" style={{ width: "250px" }}>
        <Link
          to="/admin/blogs"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <img className="img-fluid p-2" src={Favicon32} />
          <span className="fs-4">Blogify</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          {isAdmin && (
            <li>
              <Link
                to="/admin/users"
                className={
                  pathname.includes("users")
                    ? "nav-link text-light active"
                    : "nav-link text-dark"
                }
              >
                <i className="fa fa-users"></i> Users
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/admin/blogs"
              className={
                pathname.includes("blogs")
                  ? "nav-link text-light active"
                  : "nav-link text-dark"
              }
            >
              <i className="fa fa-book"></i>&nbsp; Blogs
            </Link>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              <i className="fa fa-user-circle-o"></i>&nbsp;
              <strong className="text-dark">
                {JSON.parse(localStorage.getItem("currentUser"))?.name}
              </strong>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Link to="/admin/profile" className="dropdown-item">
                Profile
              </Link>
              <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
