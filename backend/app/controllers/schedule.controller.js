// schedule.controller.js
const Schedule = require("../models/schedule.model");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

// Create a new schedule
exports.createSchedule = async (req, res) => {
  try {
    // Extract the custom Id field from the request body
    const { Id, Subject, StartTime, EndTime } = req.body;

    // Create a new schedule document with the custom Id
    const schedule = new Schedule({ Id, Subject, StartTime, EndTime });

    // Save the schedule document without an _id field
    await schedule.save();

    // Return the response with the custom Id field
    res.status(201).json({ Id, Subject, StartTime, EndTime });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve all schedules
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find({}, { _id: 0 });
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve a single schedule by ID
exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a schedule by ID
exports.updateSchedule = async (req, res) => {
  try {
    const updatedSchedule = await Schedule.findOneAndUpdate(
      { Id: req.params.id }, // Find the schedule by its custom Id
      req.body, // Update with the provided data
      { new: true }
    );
    if (!updatedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json(updatedSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a schedule by ID
exports.deleteSchedule = async (req, res) => {
  try {
    const deletedSchedule = await Schedule.findOneAndDelete({
      Id: req.params.id,
    });
    if (!deletedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(204).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
