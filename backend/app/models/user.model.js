const mongoose = require("mongoose");

// mongoose dùng để query dữ liệu từ backend
// tới mongodb
// Tại phần server.js đã config phần này
// Nên ở đây chỉ cần gọi ra là có thể query
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
