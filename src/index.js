const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const activityRouter = require("./interfaces/routes/activityRouter");
const excuteConsumer = require("./infrastructure/kafka/consumer");
dotenv.config({ path: "./config.env" });
const app = express();

app.use(express.json());

let connectionStr = process.env.MONGODB.replace(
  "<db_password>",
  process.env.MONGODBPASSWORD
);

mongoose
  .connect(connectionStr)
  .then((c) => {
    //   console.log(c.connections);
    console.log("connect to database ✅");
  })
  .catch((err) => console.log(err));

app.use("/api/v1/activity", activityRouter);

excuteConsumer();

const port = process.env.PORT || 3000;
app.listen(port, "127.0.0.1", () => {
  console.log("server start");
});
