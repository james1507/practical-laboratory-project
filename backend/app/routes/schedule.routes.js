// schedule.routes.js
const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/schedule.controller");
const controller = require("../controllers/user.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/schedule/all", controller.allAccess);

  // Create a new schedule
  app.post("/api/schedules", scheduleController.createSchedule);

  // Retrieve all schedules
  app.get("/api/schedules", scheduleController.getAllSchedules);

  app.get("/api/schedules/user", scheduleController.getAllSchedulesByUser);

  // Retrieve a single schedule by ID
  app.get("/api/schedules/:id", scheduleController.getScheduleById);

  // Update a schedule by ID
  app.put("/api/schedules/:id", scheduleController.updateSchedule);

  app.put(
    "/api/update-by-id-match-schedule/:IdMatchSchedule",
    scheduleController.updateScheduleByIdMatchSchedule
  );

  // Delete a schedule by ID
  app.delete("/api/schedules/:id", scheduleController.deleteSchedule);
};
