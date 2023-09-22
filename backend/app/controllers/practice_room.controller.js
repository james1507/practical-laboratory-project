const PracticeRoom = require('../models/practice_room.model.js');

// Create a new practice room
exports.createPracticeRoom = async (req, res) => {
  try {
    const { Name, Description } = req.body;

    const practiceRoom = new PracticeRoom({ Name, Description, Id: req.body._id });

    const savedPracticeRoom = await practiceRoom.save();
    res.status(201).json(savedPracticeRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all practice rooms
exports.getAllPracticeRooms = async (req, res) => {
  try {
    const practiceRooms = await PracticeRoom.find();
    res.status(200).json(practiceRooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific practice room by Id
exports.getPracticeRoomById = async (req, res) => {
  try {
    const practiceRoom = await PracticeRoom.findById(req.params.id);
    if (!practiceRoom) {
      return res.status(404).json({ error: 'Practice room not found' });
    }
    res.status(200).json(practiceRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a practice room by Id
exports.updatePracticeRoom = async (req, res) => {
  try {
    const updatedPracticeRoom = await PracticeRoom.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPracticeRoom) {
      return res.status(404).json({ error: 'Practice room not found' });
    }
    res.status(200).json(updatedPracticeRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a practice room by Id
exports.deletePracticeRoom = async (req, res) => {
  try {
    const deletedPracticeRoom = await PracticeRoom.findByIdAndRemove(
      req.params.id
    );
    if (!deletedPracticeRoom) {
      return res.status(404).json({ error: 'Practice room not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
