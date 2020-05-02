const {
  newExercise,
  allExercise,
  myExercise,
} = require("../controllers/exercise.controller");
const router = require("express").Router();
const isAuthenticated = require("../middleware/middleware");

router.route("/exercises").post(isAuthenticated, newExercise).get(allExercise);
router.route("/me").get(isAuthenticated, myExercise);

module.exports = router;
