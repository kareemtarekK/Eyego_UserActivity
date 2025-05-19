const express = require("express");
const activityController = require("./../../infrastructure/database/activityController");
const activityRouter = express.Router();

activityRouter
  .route("/")
  .post(activityController.createActivity)
  .get(activityController.findAllActivities);

activityRouter.get("/:id", activityController.findActivityById);

module.exports = activityRouter;
