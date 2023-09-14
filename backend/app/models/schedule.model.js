const mongoose = require("mongoose");

const Schedule = mongoose.model(
  "Schedule",
  new mongoose.Schema({
    Id: String,
    Subject: String,
    StartTime: String,
    EndTime: String,
  })
);

module.exports = Schedule;
