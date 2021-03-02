const db = require("../models/Workout");

module.exports = (app) => {
  app.get("/api/workouts", (req, res) => {
    db.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ])
      .sort({ date: -1 })
      .then((dbWorkout) => {
        console.log(dbWorkout);
        res.json(dbWorkout);
      });
  });

  app.post("/api/workouts", (req, res) => {
    db.create({})
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.get("/api/workouts/range", (req, res) => {
    db.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ])
      .then((dbWorkout) => {
        console.log(dbWorkout);
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.put("/api/workouts/:id", (req, res) => {
    db.findByIdAndUpdate(
      req.params.id,
      {
        $push: { exercise: req.body },
      },
      {
        new: true,
      }
    )
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};
