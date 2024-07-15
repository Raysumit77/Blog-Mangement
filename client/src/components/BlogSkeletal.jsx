import CardImg from "../assets/logo/android-chrome-512x512.png";

export const BlogSkeletal = () => {
  return (
    <div className="col-md-3">
      <div className="card mb-3">
        <img
          src={CardImg}
          className="card-img-top"
          style={{ width: "100%", height: "17vw", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-10"></span>
          </h5>
          <p className="card-text placeholder-glow">
            <em>
              <span className="placeholder col-10"></span>
              <span className="placeholder col-10"></span>
            </em>
          </p>
          <span className="placeholder-glow">
            <i className="fa fa-user"></i>&nbsp;
            <span className="placeholder col-4"></span>
            &nbsp;
          </span>
          <span className="placeholder-glow">
            <i className="fa fa-calendar"></i>&nbsp;
            <span className="placeholder col-4"></span>
          </span>
          <div className="d-flex justify-content-between mt-4">
            <a href="#" className="btn btn-custom">
              Read more
            </a>
            <a href="#" className="btn btn-light">
              <i className="fa fa-bookmark"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
