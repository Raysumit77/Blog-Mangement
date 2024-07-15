import moment from "moment";

const dateFormatter = (date) => {
  return moment(date).format("Do MMM YYYY");
};

export default dateFormatter;
