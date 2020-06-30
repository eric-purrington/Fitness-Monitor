const db = require("../models");

"/"
"/stats"
"/exercise?"
"/exercise"

var path = require("path");

module.exports = function(app) {
  app.get("/", (req, res) => {
    db.Note.find({})
      .then(dbNote => {
        res.json(dbNote);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  app.get("/stats", (req, res) => {
    db.User.find({})
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  app.post("/exercise", ({ body }, res) => {
    db.Note.create(body)
      .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  app.get("/populateduser", (req, res) => {
    db.User.find({})
      .populate("notes")
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  });

};

