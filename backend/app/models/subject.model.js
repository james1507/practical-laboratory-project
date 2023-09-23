const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {
    Name: String,
    Description: String,
  },
  {
    versionKey: false,
  }
);

// Add a virtual getter for 'Id' that returns '_id'
SubjectSchema.virtual("Id").get(function () {
  return this._id;
});

const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;
