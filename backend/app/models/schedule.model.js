const mongoose = require("mongoose");

const Schedule = mongoose.model(
  "Schedule",
  new mongoose.Schema(
    {
      IdMatchSchedule: String,
      IdUser: String,
      Subject: String,
      StartTime: String,
      EndTime: String,
      Description: String,
      ResourceId: String,
    },
    {
      versionKey: false,
      // _id: false,
    }
  )
);

module.exports = Schedule;
