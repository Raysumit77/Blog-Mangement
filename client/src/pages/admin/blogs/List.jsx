import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, listBlogs, removeBlog } from "../../../slices/blogSlice";

export const AdminBlogs = () => {
  const dispatch = useDispatch();
  const { blogs, currentPage, limit } = useSelector((state) => state.blogs);

  const initFetch = useCallback(() => {
    dispatch(listBlogs({ page: currentPage, limit }));
  }, [dispatch, currentPage, limit]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const handleRemove = async (e, slug) => {
    e.preventDefault();
    dispatch(removeBlog(slug));
  };

  const handleStatus = async (e, slug) => {
    e.preventDefault();
    dispatch(changeStatus(slug));
  };

  return (
    <div className="col-md-12">
      <div className="container d-grid gap-4">
        <div className="flex d-flex justify-content-between">
          <h3>Blogs</h3>
          <Link to="/admin/blogs/add" className="btn btn-danger">
            New Blog
          </Link>
        </div>
        <div className="d-flex">
          <div className="card w-100 shadow">
            <div className="card-body">
              <table className="table table-hover table-bordered rounded-circle">
                <thead className="table-secondary">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs?.length > 0 ? (
                    blogs?.map((blog, idx) => {
                      return (
                        <tr key={blog?.slug}>
                          <th scope="row">{idx + 1}</th>
                          <td rowSpan="1">{blog?.title}</td>
                          <td>{blog?.author}</td>
                          <td>
                            <div className="d-flex align-self-start">
                              <label className="form-check-label">
                                Draft&nbsp;
                              </label>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  checked={blog?.status === "published"}
                                  onChange={(e) => handleStatus(e, blog?.slug)}
                                />
                                <label className="form-check-label">
                                  Published
                                </label>
                              </div>
                            </div>
                          </td>
                          <td>
                            <ButtonToolbar>
                              <ButtonGroup className="me-2">
                                <Link
                                  to={`/admin/blogs/${blog?.slug}`}
                                  className="btn btn-primary"
                                >
                                  <i className="fa fa-eye"></i>
                                </Link>
                              </ButtonGroup>
                              <ButtonGroup className="me-2">
                                <Button
                                  className="btn btn-danger"
                                  onClick={(e) => handleRemove(e, blog?.slug)}
                                >
                                  <i className="fa fa-trash"></i>
                                </Button>
                              </ButtonGroup>
                            </ButtonToolbar>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center">
                        No Blogs Found!!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* <div className="row">
              <div className="d-flex justify-content-center d-grid gap-2">
                <ul className="pagination">
                  <select className="page-item">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </select>
                </ul>
                <nav aria-label="Page navigation example">
                  <ul className="pagination pagination-sm">
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
