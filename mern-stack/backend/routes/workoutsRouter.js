const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutsController");

// Applying middleware for all workout routes

router.use(requireAuth);

// Get all workouts
router.get("/", getWorkouts);

// Get single workout
router.get("/:id", getWorkout);

// Create a new workout
router.post("/", createWorkout);

// Delete a workout
router.delete("/:id", deleteWorkout);

// Update a workout
router.patch("/:id", updateWorkout);

module.exports = router;
