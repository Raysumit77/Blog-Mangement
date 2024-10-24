import "./Login.css";
import Logo from "../assets/logo.png";

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import instance from "../utils/api";
import { URLS } from "../constants";

import Notify from "../components/Notify";

export const VerifyDPassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [payload, setPayload] = useState({
    email: state?.email || "",
    token: "",
    newPassword: "",
  });

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsDisabled(true);
      const res = await instance.post(URLS.VERIFY_FP, payload);
      if (res.data.data) {
        setMsg(res.data.data);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (e) {
      const err = e.response.data.msg || "Something went wrong";
      setError(err);
    } finally {
      setIsDisabled(false);
      setTimeout(() => {
        setPayload({
          email: state?.email || "",
          token: "",
          newPassword: "",
        });
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
              <h2 className="text-center mt-2">Verify Forget Password</h2>
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
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    autoComplete="email"
                    value={payload.email}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Token</label>
                  <input
                    type="text"
                    className="form-control"
                    value={payload.token}
                    onChange={(e) => {
                      setPayload((prev) => {
                        return { ...prev, token: e.target.value };
                      });
                    }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="text"
                    className="form-control"
                    value={payload.newPassword}
                    onChange={(e) => {
                      setPayload((prev) => {
                        return { ...prev, newPassword: e.target.value };
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
                    Submit
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
