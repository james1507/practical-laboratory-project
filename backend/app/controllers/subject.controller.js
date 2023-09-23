const Subject = require("../models/subject.model");

// Create a new subject
exports.createSubject = async (req, res) => {
  try {
    const { Name, Description } = req.body;
    const newSubject = new Subject({ Name, Description });
    const savedSubject = await newSubject.save();
    res.status(201).json(savedSubject);
  } catch (error) {
    res.status(500).json({ error: "Could not create subject" });
  }
};

// Get all subjects
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve subjects" });
  }
};

// Get a single subject by ID
exports.getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve the subject" });
  }
};

// Update a subject by ID
exports.updateSubject = async (req, res) => {
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSubject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    res.status(200).json(updatedSubject);
  } catch (error) {
    res.status(500).json({ error: "Could not update the subject" });
  }
};

// Delete a subject by ID
exports.deleteSubject = async (req, res) => {
  try {
    const deletedSubject = await Subject.findByIdAndRemove(req.params.id);
    if (!deletedSubject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Could not delete the subject" });
  }
};
