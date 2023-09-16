const mongoose = require("mongoose");

const Schedule = mongoose.model(
  "Schedule",
  new mongoose.Schema(
    {
      Id: {
        type: String,
        unique: true, // Ensure the custom Id is unique
      },
      IdUser: {
        type: String,
      },
      Subject: String,
      StartTime: String,
      EndTime: String,
      Description: String,
    },
    {
      versionKey: false,
      // _id: false,
    }
  )
);

module.exports = Schedule;
