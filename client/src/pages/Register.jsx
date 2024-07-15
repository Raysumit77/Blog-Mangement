import "./Login.css";
import Logo from "../assets/logo.png";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import instance from "../utils/api";
import { URLS } from "../constants";

import Notify from "../components/Notify";

export const Register = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsDisabled(true);
      const result = await instance.post(URLS.REGISTER, payload);
      if (result.data.data) {
        setMsg(result.data.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (e) {
      const err = e?.response?.data?.msg || "Something went wrong";
      setError(err);
    } finally {
      setIsDisabled(false);
      setTimeout(() => {
        setMsg("");
        setError("");
      }, 2000);
    }
  };

  return (
    <div className="base d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-4">
        <div className="card shadow">
          <div className="card-body">
            <div className="row d-flex justify-content-center align-items-center">
              <img src={Logo} style={{ maxWidth: "75px" }} />
              <h2 className="text-center mt-2">Register</h2>
              {(msg || error) && (
                <Notify type={msg ? "success" : "danger"} msg={msg || error} />
              )}
              <form
                className="mb-3"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    className="form-control"
                    value={payload.name}
                    onChange={(e) => {
                      setPayload((prev) => {
                        return { ...prev, name: e.target.value };
                      });
                    }}
                    required
                  />
                </div>
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
                <div className="d-grid col-6 mx-auto">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={isDisabled}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <hr />
              <div className="d-flex justify-content-center">
                <Link to="/login" className="text-decoration-none">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
