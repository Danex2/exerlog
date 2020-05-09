const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const authentication = require("./routes/userRoutes");
const exercise = require("./routes/exerciseRoutes");
const path = require("path");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    methods: ["GET", "POST"],
  })
);
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use([authentication, exercise]);

app.use(express.static("src/client/public"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/public", "index.html"));
});

app.use((req, res, next) => {
  return res.status(404).json({
    status: 404,
    message: `No such route: ${req.path}`,
  });
});

app.use((err, req, res, next) => {
  return res.status(500).json({
    status: 500,
    message: err.message,
  });
});

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://exerdb:27017/exerdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongDB started.");
    app.listen(PORT, () => console.log("Server started sucessfully."));
  });
