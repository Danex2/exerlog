const {
  newExercise,
  allExercise,
} = require("../controllers/exercise.controller");
const router = require("express").Router();
const isAuthenticated = require("../middleware/middleware");

router.route("/exercise").post(isAuthenticated, newExercise).get(allExercise);

module.exports = router;
