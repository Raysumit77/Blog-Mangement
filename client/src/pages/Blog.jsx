import "./Blog.css";

import _ from "lodash";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs";
import dateFormatter from "../utils/date";
import { Comment } from "../components/Comment";

import { useBlogsContext } from "../context/BlogContext";
import { BASE_URL } from "../constants";

export const Blog = () => {
  const { blogs } = useBlogsContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const slug = pathname.split("/")[2];
  const { getOneBlog } = useBlogs();

  const [data, setData] = useState({});

  useEffect(() => {
    const getBlog = async () => {
      const result = await getOneBlog(slug);
      if (!result) {
        navigate("/blogs");
      }
      setData(result);
    };
    getBlog();
  }, [slug, getOneBlog, navigate]);

  const getRandomBlogs = () => {
    const excludeThis = blogs?.data?.filter((blog) => blog.slug !== slug);
    return _.sampleSize(excludeThis, 3);
  };
  return (
    <>
      <div className="d-flex flex flex-column mb-4 rounded-3">
        <div className="d-flex justify-content-center">
          <img src={data?.pictureUrl} className="img-fluid" width="800px" />
        </div>
        <div className="row mt-2">
          <nav className="breadCrumbStyle">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                <Link to="/blogs" className="text-decoration-none">
                  Blogs
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {data?.title}
              </li>
            </ol>
          </nav>

          <div className="container">
            <div className="row">
              <h1>{data?.title}</h1>
            </div>
            <div className="row">
              <div className="flex d-flex d-grid gap-2">
                <i className="fa fa-calendar"></i>
                <span>
                  {dateFormatter(data?.publishedDate)} by {data?.author?.name}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <p className="lead">{data?.content}</p>
          </div>
        </div>
        {data?.title && (
          <div>
            <h2>Comments</h2>
            <Comment
              url={window.location.href}
              slug={slug}
              title={data?.title}
            />
          </div>
        )}
        <div className="row">
          <h2>Recent Posts</h2>
          <div className="card-group">
            {getRandomBlogs().map((post) => {
              return (
                <div key={post?.slug} className="card">
                  <img
                    src={
                      post?.pictureUrl.includes("https:")
                        ? post?.pictureUrl
                        : BASE_URL.concat(post?.pictureUrl)
                    }
                    className="card-img-top"
                    alt={post?.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{post?.title}</h5>
                    <p className="card-text">{_.truncate(post?.content)}</p>
                    <p className="card-text">
                      <small className="text-body-secondary">
                        {dateFormatter(post?.publishedDate)}
                      </small>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
