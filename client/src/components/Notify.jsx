import { Alert } from "react-bootstrap";

const Notify = ({ type, msg }) => {
  return <Alert variant={type}>{msg}</Alert>;
};

export default Notify;
