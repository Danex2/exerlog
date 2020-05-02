const Exercise = require("../models/Exercise");
const User = require("../models/User");

module.exports = {
  newExercise: async (req, res, next) => {
    try {
      const { exercise, duration } = req.body;
      const workout = await Exercise.create({
        exercise,
        duration,
        postedBy: res.locals.id,
      });
      await User.findByIdAndUpdate(
        { _id: res.locals.id },
        { $push: { workouts: { exercises: workout._id } } }
      );

      return res.status(201).end();
    } catch (error) {
      next(error);
    }
  },
  allExercise: async (req, res, next) => {
    try {
      const exercises = await Exercise.find({}).populate(
        "postedBy",
        "username"
      );
      return res.status(200).json(exercises);
    } catch (error) {
      next(error);
    }
  },
  myExercise: async (req, res, next) => {
    try {
      const user = await User.findById({ _id: res.locals.id }).populate(
        "workouts.exercises",
        "id exercise duration createdAt"
      );
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
};
