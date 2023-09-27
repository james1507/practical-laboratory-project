const express = require("express");
const router = express.Router();
const controller = require("../controllers/equipment.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });
  // Create a new Schedule
  app.post("/api/equipment", controller.create);

  // Retrieve all Schedules
  app.get("/api/equipments", controller.findAll);

  // Retrieve a single Schedule by Id
  app.get("/api/equipment/:id", controller.findOne);

  // Update a Schedule by Id
  app.put("/api/equipment/:id", controller.update);

  // Delete a Schedule by Id
  app.delete("/api/equipment/:id", controller.delete);
};
