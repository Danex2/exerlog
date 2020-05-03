const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!username || !password) {
        return res.status(400).json({
          status: 400,
          message: "Missing username or password",
        });
      }
      if (user) {
        return res.status(400).json({
          status: 400,
          message: "User already exists",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ username, password: hashedPassword });
      return res.status(201).end();
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({
          status: 400,
          message: "Error: No one with that username exists",
        });
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(400).json({
          status: 400,
          message: "Invalid username or password",
        });
      }
      let token = jwt.sign({ id: user.id }, "mysecret", {
        algorithm: "HS256",
        expiresIn: "1h",
      });
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  },
};
