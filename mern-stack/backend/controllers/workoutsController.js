const workoutModel = require("../models/workoutModel");

const mongoose = require("mongoose");
const { secondDBConnection } = require("../databases/mongooseDb");

// Get all workouts

const getWorkouts = async (req, res) => {
  try {
    const tekieDb = await secondDBConnection.db
      .collection("User")
      .findOne();
    console.log({ tekieDb });
    const user_id = req.user._id;
    const workouts = await workoutModel
      .find({ user_id })
      .sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get single workout

const getWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: "No such record" });
    }
    const workout = await workoutModel.findById(id);
    if (!workout) res.status(404).json({ error: "No such record" });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new workout

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  const emptyField = [];
  if (!title) {
    emptyField.push("title");
  }
  if (!reps) {
    emptyField.push("reps");
  }
  if (!load) {
    emptyField.push("load");
  }
  if (emptyField.length) {
    res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyField });
  }
  try {
    const user_id = req.user._id;
    const workout = await workoutModel.create({ title, reps, load, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a workout

const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: "No such record" });
    }
    const workout = await workoutModel.findByIdAndDelete(id);
    if (!workout) res.status(404).json({ error: "No such record" });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a workout

const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: "No such record" });
    }
    const workout = await workoutModel.findByIdAndUpdate(id, req.body);
    if (!workout) res.status(404).json({ error: "No such record" });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
