const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Set up table, doesn't need every field
const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  // exercises will fill this array
  exercises: [
    {
      type: {
        type: String
      },
      name: {
        type: String,
        trim: true
      },
      duration: Number,
      distance: Number,
      weight: Number,
      reps: Number,
      sets: Number
    }
  ]
});

// Setting up for export
const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;