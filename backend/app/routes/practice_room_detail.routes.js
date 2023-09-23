const express = require("express");
const router = express.Router();
const {
  create,
  read,
  update,
  remove,
  list,
  getByMatchScheduleId,
  updateByMatchScheduleId,
} = require("../controllers/practice_room_detail.controller");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Create a new practice room detail
  app.post("/api/practice-room-details", create);

  // Get a single practice room detail by ID
  app.get("/api/practice-room-details/:detailId", read);

  // Update a practice room detail by ID
  app.put("/api/practice-room-details/:detailId", update);

  // Delete a practice room detail by ID
  app.delete("/api/practice-room-details/:detailId", remove);

  // Get a list of all practice room details
  app.get("/api/practice-room-details", list);

  app.get(
    "/api/practice-room-details/by-matches/:IdMatchSchedule",
    getByMatchScheduleId
  );

  app.put(
    "/api/practice-room-details/by-matches/:IdMatchSchedule",
    updateByMatchScheduleId
  );
};
