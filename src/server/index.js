const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const authentication = require("./routes/userRoutes");
const exercise = require("./routes/exerciseRoutes");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({ credentials: true, origin: "http://localhost:1234" }));
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use([authentication, exercise]);

app.get("/authenticate", async (req, res, next) => {
  try {
    if (req.cookies.token) {
      let token = req.cookies.token;
      jwt.verify(token, "mysecret", { algorithm: "HS256" }, (err, user) => {
        if (err) {
          return res.status(500).json({ error: "Not Authorized" });
        }
        res.locals.id = user.id;
        return res.status(200).end();
      });
    }
    return res.status(500).json({ error: "Not Authorized" });
  } catch (error) {
    next(error);
  }
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
  .connect(process.env.DB_URI || "mongodb://localhost:27017/exerdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongDB started.");
    app.listen(PORT, () => console.log("Server started sucessfully."));
  });
