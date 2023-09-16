// schedule.controller.js
const Schedule = require("../models/schedule.model");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

// Create a new schedule
exports.createSchedule = async (req, res) => {
  try {
    const { Id, IdUser, Subject, StartTime, EndTime, Description } = req.body;

    const schedule = new Schedule({
      Id,
      IdUser,
      Subject,
      StartTime,
      EndTime,
      Description,
    });
    await schedule.save();

    res
      .status(201)
      .json({ Id, IdUser, Subject, StartTime, EndTime, Description });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllSchedulesByUser = async (req, res) => {
  try {
    const { IdUser } = req.query;
    const schedules = await Schedule.find(
      { IdUser },
      {
        _id: 0,
        Id: "$_id",
        Subject: 1,
        StartTime: 1,
        EndTime: 1,
        Description: 1,
      }
    );

    // Transform the _id field to Id in each schedule object
    const transformedSchedules = schedules.map((schedule) => ({
      Id: schedule.Id,
      Subject: schedule.Subject,
      StartTime: schedule.StartTime,
      EndTime: schedule.EndTime,
      Description: schedule.Description,
    }));

    res.status(200).json(transformedSchedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
