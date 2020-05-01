const { register, login } = require("../controllers/user.controller");
const router = require("express").Router();

router.route("/register").post(register);

module.exports = router;
