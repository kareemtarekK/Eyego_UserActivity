const mongoose = require("mongoose");
const activitySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: [true, "provide action !"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    deafult: {},
  },
});
activitySchema.index({ userId: 1, timestamp: -1 });
const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;