import { Paginate } from "../components/Paginate";
import { Link } from "react-router-dom";
import "./Blogs.css";
import Notify from "../components/Notify";
import { useBlogsContext } from "../context/BlogContext";
import { BlogSkeletal } from "../components/BlogSkeletal";

import useDebounce from "../hooks/useDebounce";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants";

// REDUX

import { useDispatch } from "react-redux";
import { addBookmark } from "../slices/bookmarkSlice";

export const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs, error, loading, page, setPage, limit, setLimit, setTitle } =
    useBlogsContext();
  const [searchTerm, setSearchTerm] = useState("");

  const debounceSearchTerm = useDebounce({ value: searchTerm, delayInMs: 500 });

  useEffect(() => {
    setTitle(debounceSearchTerm);
  }, [debounceSearchTerm, setTitle]);

  if (error) {
    return <>{error}</>;
  }

  return (
    <>
      <div className="row mt-4">
        <h4>Blogs</h4>
        <div className="col-8">
          <div className="input-group mb-3" style={{ maxWidth: "500px" }}>
            <span className="input-group-text">
              <i className="fa fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by Blog Title"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="d-flex justify-content-end">
            <select className="form-select" style={{ maxWidth: "200px" }}>
              <option value="latest">Latest</option>
              <option value="Alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row">
        {loading && (
          <>
            <BlogSkeletal />
            <BlogSkeletal />
            <BlogSkeletal />
            <BlogSkeletal />
          </>
        )}
        {blogs?.data && blogs?.data.length > 0 ? (
          <>
            {blogs.data.map((blog) => {
              return (
                <div key={blog.slug} className="col-md-3">
                  <div className="card mb-3">
                    <img
                      src={
                        blog?.pictureUrl &&
                        blog?.pictureUrl.includes("https://")
                          ? blog?.pictureUrl
                          : BASE_URL.concat(blog?.pictureUrl)
                      }
                      className="card-img-top"
                      style={{
                        width: "100%",
                        height: "17vw",
                        objectFit: "cover",
                      }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{blog?.title}</h5>
                      <p className="card-text">
                        <em>{blog?.content.slice(0, 55).concat("...")}</em>
                      </p>
                      <i className="fa fa-user"></i>&nbsp;{blog?.author} &nbsp;
                      <i className="fa fa-clock-o"></i>&nbsp;
                      {blog?.duration || 1} min read
                      <div className="d-flex justify-content-between mt-4">
                        <Link
                          to={`/blogs/${blog?.slug}`}
                          className="btn btn-custom"
                        >
                          Read more
                        </Link>
                        <button
                          className="btn btn-light"
                          onClick={() => {
                            dispatch(addBookmark(blog));
                          }}
                        >
                          <i className="fa fa-bookmark"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <Notify type="danger" msg="No Blogs found..." />
        )}
      </div>

      {blogs?.data && blogs?.data.length > 0 && (
        <Paginate
          currentPage={page}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
          total={blogs?.total || 0}
        />
      )}
    </>
  );
};
