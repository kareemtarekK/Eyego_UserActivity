const Activity = require("./models/activityModel");
const sendMessage = require("./../kafka/producer");
exports.createActivity = async (req, res, next) => {
  const activity = req.body;
  await sendMessage(activity);
  res.status(200).json({
    status: "success",
    message: "activity sent to kafka✅",
    activity,
  });
};

exports.findActivityById = async (req, res, next) => {
  const activity = await Activity.findById(req.params.id);
  res.status(200).json({
    status: "success",
    activity,
  });
};

exports.findAllActivities = async (req, res, next) => {
  //filter
  const queryCopy = { ...req.query };
  const exclutedArr = ["page", "limit"];
  exclutedArr.forEach((e) => delete queryCopy[e]);
  let activityQuery = Activity.find(queryCopy);
  //pagination
  const limit = req.query.limit * 1 || 10;
  const page = req.query.page * 1 || 1;
  const skip = (page - 1) * limit;
  activityQuery = activityQuery.skip(skip).limit(limit);
  const activities = await activityQuery;
  res.status(200).json({
    status: "success",
    data: {
      activities,
    },
  });
};
