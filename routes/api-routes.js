const router = require("express").Router();
const db = require("./models");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});

router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body).then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
    db.Workout.find().sort({ day: -1 }).limit(1).then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } }, { new: true }).then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}).then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.status(400).json(err);
    });
});

module.exports = router;