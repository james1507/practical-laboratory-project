const mongoose = require("mongoose");

const PracticeRoomDetailSchema = new mongoose.Schema(
  {
    IdMatchSchedule: String,
    Content: String,
    PracticeRoomId: String,
    PraticeRoomName: String,
    UserId: String,
    UserName: String,
    ModeratorId: String,
    ModeratorName: String,
    SubjectId: String,
    SubjectName: String,
    TimeStart: String,
    TimeEnd: String,
    Detail: String,
  },
  {
    versionKey: false,
  }
);

// Add a virtual getter for 'Id' that returns '_id'
PracticeRoomDetailSchema.virtual("Id").get(function () {
  return this._id;
});

const PracticeRoomDetail = mongoose.model(
  "PracticeRoomDetail",
  PracticeRoomDetailSchema
);

module.exports = PracticeRoomDetail;
