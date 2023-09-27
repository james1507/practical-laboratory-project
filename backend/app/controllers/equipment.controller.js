const Schedule = require("../models/equipment.model");

// Create a new Schedule
exports.create = (req, res) => {
  const schedule = new Schedule({
    IdMatchSchedule: req.body.IdMatchSchedule,
    IdUser: req.body.IdUser,
    EquipmentName: req.body.EquipmentName,
    EquipmentDescription: req.body.EquipmentDescription,
  });

  schedule.save((err, data) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    res.send(data);
  });
};

// Retrieve all Schedules
exports.findAll = (req, res) => {
  Schedule.find({}, (err, data) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    res.send(data);
  });
};

// Find a single Schedule by Id
exports.findOne = (req, res) => {
  Schedule.findById(req.params.id, (err, data) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    if (!data) {
      return res.status(404).send({ message: "Schedule not found." });
    }
    res.send(data);
  });
};

// Update a Schedule by Id
exports.update = (req, res) => {
  Schedule.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, data) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
      if (!data) {
        return res.status(404).send({ message: "Schedule not found." });
      }
      res.send(data);
    }
  );
};

// Delete a Schedule by Id
exports.delete = (req, res) => {
  Schedule.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    if (!data) {
      return res.status(404).send({ message: "Schedule not found." });
    }
    res.send({ message: "Schedule deleted successfully!" });
  });
};
