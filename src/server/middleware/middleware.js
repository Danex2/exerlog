const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  if (typeof req.headers.authorization !== "undefined") {
    let token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, "mysecret", { algorithm: "HS256" }, (err, user) => {
      if (err) {
        res.status(500).json({ error: "Not Authorized" });
      }
      res.locals.id = user.id;
      return next();
    });
  } else {
    res.status(500).json({ error: "Not Authorized" });
  }
};

module.exports = isAuthenticated;
