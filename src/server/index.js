const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");

const User = require("./models/User");
const authentication = require("./routes/authentication");
const isAuthenticated = require("./middleware/middleware");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(authentication);

app.get("/", (req, res) => {
  res.send("Starting point for app.");
});

app.get("/secret", isAuthenticated, async (req, res, next) => {
  const user = await User.findById({ _id: res.locals.id });
  res.status(200).json(user);
});

app.use((req, res, next) => {
  return res.status(404).json({
    status: "404",
    message: `No such route: ${req.path}`,
  });
});

app.use((err, req, res, next) => {
  return res.status(500).json({
    status: "500",
    message: err.message,
  });
});

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongDB started.");
    app.listen(PORT, () => console.log("Server started sucessfully."));
  });
