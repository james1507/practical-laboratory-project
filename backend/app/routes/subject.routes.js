const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subject.controller");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/subjects", subjectController.createSubject);

  // Get all subjects
  app.get("/api/subjects", subjectController.getAllSubjects);

  // Get a single subject by ID
  app.get("/api/subjects/:id", subjectController.getSubjectById);

  // Update a subject by ID
  app.put("/api/subjects/:id", subjectController.updateSubject);

  // Delete a subject by ID
  app.delete("/api/subjects/:id", subjectController.deleteSubject);
};
