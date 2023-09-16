const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    token: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    fullName: String,
    age: String,
    collage: String,
    position: String,
    major: String,
    yearExp: String,
    aboutMe: String,
    imageUrl: String,
  })
);

module.exports = User;
