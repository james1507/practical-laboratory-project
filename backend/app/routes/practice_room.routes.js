const express = require('express');
const router = express.Router();
const practiceRoomController = require('../controllers/practice_room.controller');
const controller = require("../controllers/user.controller");



module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
        next();
      });

    // Create a new practice room
    app.post('/api/practice-rooms', practiceRoomController.createPracticeRoom);

    // Get all practice rooms
    app.get('/api/practice-rooms', practiceRoomController.getAllPracticeRooms);

    // Get a specific practice room by Id
    app.get('/api/practice-rooms/:id', practiceRoomController.getPracticeRoomById);

    // Update a practice room by Id
    app.put('/api/practice-rooms/:id', practiceRoomController.updatePracticeRoom);

    // Delete a practice room by Id
    app.delete('/api/practice-rooms/:id', practiceRoomController.deletePracticeRoom);
}
