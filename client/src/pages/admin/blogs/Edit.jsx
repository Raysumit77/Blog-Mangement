import { useDispatch, useSelector } from "react-redux";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { ButtonToolbar, ButtonGroup, Button, Form } from "react-bootstrap";

import { getBySlug, updateBlog } from "../../../slices/blogSlice";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../constants";

export const BlogEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const blogId = pathname.split("/")[3];
  const { blog } = useSelector((state) => state.blogs);
  const [payload, setPayload] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: payload?.title,
      content: payload?.content,
    };
    const result = dispatch(updateBlog({ slug: blogId, payload: data }));
    const response = await result.unwrap();
    if (response?.data?.acknowledged) {
      navigate("/admin/blogs");
    }
  };

  useEffect(() => {
    dispatch(getBySlug(blogId));
  }, [dispatch, blogId]);

  useEffect(() => {
    setPayload(blog);
  }, [blog]);

  return (
    <div className="container">
      <div className="row mb-3">
        <h2>Add new Blog</h2>
      </div>
      <div className="row">
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Form.Group className="mb-3 text-center">
            <img
              src={
                payload?.pictureUrl?.includes("https")
                  ? payload?.pictureUrl
                  : BASE_URL.concat("/", payload?.pictureUrl)
              }
              width={200}
              height={200}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <input
              className="form-control"
              placeholder="Title of your article"
              value={payload?.title || ""}
              onChange={(e) =>
                setPayload((pre) => {
                  return { ...pre, title: e.target.value };
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={8}
              value={payload?.content}
              onChange={(e) =>
                setPayload((pre) => {
                  return { ...pre, content: e.target.value };
                })
              }
            />
          </Form.Group>
          <ButtonToolbar>
            <ButtonGroup className="me-2" aria-label="First group">
              <Button type="submit" variant="success">
                Submit
              </Button>
            </ButtonGroup>
            <ButtonGroup className="me-2" aria-label="Second group">
              <Link to="/admin/blogs" className="btn btn-danger">
                Go back
              </Link>
            </ButtonGroup>
          </ButtonToolbar>
        </Form>
      </div>
    </div>
  );
};
