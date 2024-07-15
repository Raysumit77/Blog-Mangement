import Favicon32 from "../assets/logo/favicon-32x32.png";

export const Footer = () => {
  return (
    <div className="container-fluid">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            <img src={Favicon32} className="img-fluid" />
          </a>
          <span className="mb-3 mb-md-0 text-body-secondary">
            © 2024 Blogify, Inc
          </span>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <i className="fa fa-twitter"></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <i className="fa fa-instagram"></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <i className="fa fa-facebook"></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <i className="fa fa-github"></i>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};
