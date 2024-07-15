require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const indexRouter = require("./routes");
const PORT = Number(process.env.PORT);

const app = express();
mongoose.connect(process.env.DB_URL).then(() => {
  console.log("database connected");
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/assets", express.static("public"));

// app.use(req,res,next) => {
// res.body.country = "nepal";
// next();
// }
app.use("/", indexRouter);

app.use((err, req, res, next) => {
  err = err ? err.toString() : "something went wrong";
  res.status(500).json({ msg: err });
});

app.listen(PORT, () => {
  console.log(`applicaion is runnung at port ${PORT}`);
});
