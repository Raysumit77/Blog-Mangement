import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ButtonToolbar, ButtonGroup, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createBlog } from "../../../slices/blogSlice";

export const AddBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [preview, setPreview] = useState([]);
  const [images, setImages] = useState([]);
  const [payload, setPayload] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", payload?.title);
    formData.append("content", payload?.content);
    formData.append("pictureUrl", URL.createObjectURL(images[0]));
    dispatch(createBlog(formData));
    navigate("/admin/blogs");
  };

  const handleImage = (e) => {
    e.preventDefault();
    if (e.target.files) {
      setImages([...e.target.files]);
    }
  };

  useEffect(() => {
    setPreview([]);
    if (!images) {
      return;
    }
    images &&
      images.length > 0 &&
      images.map((file) => {
        const objectUrl = URL.createObjectURL(file);
        setPreview((prev) => {
          return [...prev, objectUrl];
        });
      });
  }, [images]);

  return (
    <>
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
            <Form.Group className="mb-3">
              {preview && preview.length > 0 && (
                <img src={preview[0]} width={100} height={100} />
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload Featured Image</Form.Label>
              <Form.Control type="file" onChange={(e) => handleImage(e)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Hello World"
                value={payload?.title}
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
    </>
  );
};
