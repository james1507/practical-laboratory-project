const mongoose = require("mongoose");

const PracticeRoomSchema = new mongoose.Schema(
  {
    Name: String,
    Description: String,
  },
  {
    versionKey: false,
  }
);

// Add a virtual getter for 'Id' that returns '_id'
PracticeRoomSchema.virtual("Id").get(function () {
  return this._id;
});

const PracticeRoom = mongoose.model("PracticeRoom", PracticeRoomSchema);

module.exports = PracticeRoom;
