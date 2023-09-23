const PracticeRoomDetail = require("../models/practice_room_detail.model");

// Create a new practice room detail
exports.create = (req, res) => {
  const practiceRoomDetail = new PracticeRoomDetail(req.body);

  practiceRoomDetail.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Error creating practice room detail",
      });
    }
    res.json(data);
  });
};

// Get a single practice room detail by ID
exports.read = (req, res) => {
  PracticeRoomDetail.findById(req.params.detailId, (err, detail) => {
    if (err || !detail) {
      return res.status(404).json({
        error: "Practice room detail not found",
      });
    }
    res.json(detail);
  });
};

// Update a practice room detail by ID
exports.update = (req, res) => {
  PracticeRoomDetail.findByIdAndUpdate(
    { _id: req.params.detailId },
    { $set: req.body },
    { new: true },
    (err, detail) => {
      if (err) {
        return res.status(400).json({
          error: "Error updating practice room detail",
        });
      }
      res.json(detail);
    }
  );
};

// Delete a practice room detail by ID
exports.remove = (req, res) => {
  PracticeRoomDetail.findByIdAndRemove(req.params.detailId, (err, detail) => {
    if (err || !detail) {
      return res.status(404).json({
        error: "Practice room detail not found",
      });
    }
    res.json({ message: "Practice room detail deleted successfully" });
  });
};

// Get a list of all practice room details
exports.list = (req, res) => {
  PracticeRoomDetail.find().exec((err, details) => {
    if (err) {
      return res.status(400).json({
        error: "Error fetching practice room details",
      });
    }
    res.json(details);
  });
};

exports.getByMatchScheduleId = (req, res) => {
  const { IdMatchSchedule } = req.params; // Assuming you pass IdMatchSchedule as a URL parameter

  // Find a practice room detail by IdMatchSchedule
  PracticeRoomDetail.findOne({ IdMatchSchedule }, (err, detail) => {
    if (err || !detail) {
      return res.status(404).json({
        error: "Practice room detail not found for IdMatchSchedule",
      });
    }
    res.json(detail);
  });
};

// Update a practice room detail by IdMatchSchedule
exports.updateByMatchScheduleId = (req, res) => {
  const { IdMatchSchedule } = req.params;

  PracticeRoomDetail.findOneAndUpdate(
    { IdMatchSchedule },
    { $set: req.body },
    { new: true },
    (err, detail) => {
      if (err || !detail) {
        return res.status(404).json({
          error: "Practice room detail not found",
        });
      }
      res.json(detail);
    }
  );
};
