// schedule.routes.js
const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/schedule.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/schedule/all", controller.allAccess);

  // Create a new schedule
  router.post("/api/schedules", scheduleController.createSchedule);

  // Retrieve all schedules
  router.get("/api/schedules", scheduleController.getAllSchedules);

  // Retrieve a single schedule by ID
  router.get("/api/schedules/:id", scheduleController.getScheduleById);

  // Update a schedule by ID
  router.put("/api/schedules/:id", scheduleController.updateSchedule);

  // Delete a schedule by ID
  router.delete("/api/schedules/:id", scheduleController.deleteSchedule);
};
