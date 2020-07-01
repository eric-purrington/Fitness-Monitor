const router = require("express").Router();
const db = require("../models");

// Create new workout
router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body).then(dbWorkout => {
        res.send(dbWorkout);
    }).catch(err => {
        res.status(400).json(err);
    });
});

// Get last workout
router.get("/api/workouts", (req, res) => {
    db.Workout.find().sort({ day: -1 }).limit(1).then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.status(400).json(err);
    });
});

// update workout with exercise
router.put("/api/workouts/:id", (req, res) => {
    db.Workout.updateOne({ _id: req.params.id }, { $push: { exercises: req.body } },{ new: true, upsert: true}).then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// Get all workouts
router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}).then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.status(400).json(err);
    });
});

module.exports = router;