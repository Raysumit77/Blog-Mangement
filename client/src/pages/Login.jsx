import "./Login.css";
import Logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import instance from "../utils/api";
import { URLS } from "../constants";
import { setToken } from "../utils/session";
import { isLoggedIn, setCurrentUser } from "../utils/login";
import Notify from "../components/Notify";

export const Login = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (e) => {
    try {
      setIsDisabled(true);
      e.preventDefault();
      const result = await instance.post(URLS.LOGIN, payload);
      if (result.data.data) {
        setToken(result.data.data);
        setCurrentUser();
        setMsg("User successfully logged in");
        setTimeout(() => {
          navigate("/admin/blogs");
        }, 1500);
      }
    } catch (e) {
      const err = e?.response?.data?.msg || "Something went wrong";
      setError(err);
    } finally {
      setIsDisabled(false);
      setPayload({ email: "", password: "" });
      setTimeout(() => {
        setError("");
        setMsg("");
      }, 3000);
    }
  };

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/admin/blogs");
    }
  }, [navigate]);

  return (
    <div className="base d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-4">
        <div className="card shadow">
          <div className="card-body">
            <div className="row d-flex justify-content-center align-items-center">
              <img src={Logo} style={{ maxWidth: "75px" }} />
              <h2 className="text-center mt-2">Login</h2>
              {(msg || error) && (
                <Notify type={msg ? "success" : "danger"} msg={msg || error} />
              )}
              <form className="mb-3" onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    autoComplete="email"
                    value={payload.email}
                    onChange={(e) => {
                      setPayload((prev) => {
                        return { ...prev, email: e.target.value };
                      });
                    }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    autoComplete="current-password"
                    value={payload.password}
                    onChange={(e) => {
                      setPayload((prev) => {
                        return { ...prev, password: e.target.value };
                      });
                    }}
                    required
                  />
                </div>
                <div className="mb-3 d-flex flex-row-reverse">
                  <Link to="/forget-password" className="text-decoration-none">
                    Forget Password?
                  </Link>
                </div>
                <div className="d-grid col-6 mx-auto">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={isDisabled}
                  >
                    Login
                  </button>
                </div>
              </form>
              <hr />
              <div className="d-flex justify-content-center">
                <Link to="/register" className="text-decoration-none">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
