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
        { $push: { exercise: workout._id } }
      );

      return res.status(201).end();
    } catch (error) {
      next(error);
    }
  },
  allExercise: async (req, res, next) => {
    try {
      const exercises = await Exercise.find({}).populate("postedBy");
      return res.status(200).json(exercises);
    } catch (error) {
      next(error);
    }
  },
};
