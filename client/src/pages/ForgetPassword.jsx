import "./Login.css";
import Logo from "../assets/logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Notify from "../components/Notify";
import { URLS } from "../constants";
import instance from "../utils/api";

export const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [isDisable, setIsDisable] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsDisable(true);
      const res = await instance.post(URLS.GENERATE_FP, { email });
      setMsg(res.data.data);
      if (res.data.data) {
        navigate("/verify-password", { state: { email } });
      }
    } catch (e) {
      const errMsg = e?.response?.data?.msg || "Something went wrong!";
      setError(errMsg);
    } finally {
      setIsDisable(false);
      setTimeout(() => {
        setError("");
        setMsg("");
        setEmail("");
      }, 1500);
    }
  };
  return (
    <div className="base d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-4">
        <div className="card shadow">
          <div className="card-body">
            <div className="row d-flex justify-content-center align-items-center">
              <img src={Logo} style={{ maxWidth: "75px" }} />
              <h2 className="text-center mt-2">Forget Password</h2>
              {(msg || error) && (
                <Notify
                  type={error ? "danger" : "success"}
                  msg={msg || error}
                />
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
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="d-grid col-6 mx-auto">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={isDisable}
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
