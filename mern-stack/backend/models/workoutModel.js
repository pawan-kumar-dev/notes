const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      require: true,
    },
  },
  //   Whenever a doc is created or updated it adds createdAt and updatedAt field to it
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
