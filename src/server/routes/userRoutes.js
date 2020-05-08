const { register, login, logout } = require("../controllers/user.controller");
const router = require("express").Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);

module.exports = router;
