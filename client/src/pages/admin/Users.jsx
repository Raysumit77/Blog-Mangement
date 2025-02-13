import { useCallback, useEffect, useState } from "react";
import {
  Badge,
  ButtonGroup,
  Button,
  ButtonToolbar,
  Form,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { myProfile, changePassword } from "../../slices/authSlice";
import dateFormatter from "../../utils/date";
import Notify from "../../components/Notify";
import { Check } from "lucide-react";

export const AdminUser = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const [key, setKey] = useState("0");

  const fetchProfile = useCallback(() => {
    dispatch(myProfile());
  }, [dispatch]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="0" title="My Profile">
          <UserHome profile={profile} />
        </Tab>
        <Tab eventKey="1" title="Change Password">
          <UserChangePW profile={profile} />
        </Tab>
      </Tabs>
    </>
  );
};

const UserHome = ({ profile }) => {
  return (
    <>
      <div className="card">
        <div className="row">
          <div className="col">
            <div className="card-body">
              <h5 className="card-title">
                {profile?.name} &nbsp;
                <Badge bg="success">
                  <Check />
                </Badge>
              </h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group list-item">Email: {profile?.email} </li>
              <li className="list-group list-item">
                Joined at: {dateFormatter(profile?.createdAt)}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

const UserChangePW = ({ profile }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const [payload, setPayload] = useState({
    email: profile?.email,
    oldPassword: "",
    newPassword: "",
  });
  const [msg, setMsg] = useState({ type: "", msg: "" });

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const result = dispatch(changePassword(payload));
    const resp = await result.unwrap();
    console.log({ resp });
    setMsg(resp);
    setTimeout(() => {
      setMsg("");
      setPayload({
        email: profile?.email,
        oldPassword: "",
        newPassword: "",
      });
    }, 2000);
  };

  const handleReset = () => {
    setPayload({
      email: profile?.email,
      oldPassword: "",
      newPassword: "",
    });
  };

  return (
    <>
      {(msg || error) && (
        <Notify
          type={error ? "danger" : msg?.type}
          msg={error ? "Something went wrong" : msg?.msg}
        />
      )}
      <Form onSubmit={(e) => handleChangePassword(e)}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <input
            className="form-control"
            type="email"
            value={payload?.email}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Old Password</Form.Label>
          <input
            className="form-control"
            placeholder="Your Old Password"
            value={payload?.oldPassword}
            onChange={(e) => {
              setPayload((prev) => ({ ...prev, oldPassword: e.target.value }));
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <input
            className="form-control"
            placeholder="Your New Password"
            value={payload?.newPassword}
            onChange={(e) => {
              setPayload((prev) => ({ ...prev, newPassword: e.target.value }));
            }}
          />
        </Form.Group>
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup className="me-2">
            <Button variant="secondary" type="submit">
              Change My Password
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="danger" onClick={handleReset}>
              Reset
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Form>
    </>
  );
};