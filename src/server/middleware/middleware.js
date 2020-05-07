const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  if (req.cookies.token) {
    let token = req.cookies.token;

    jwt.verify(token, "mysecret", { algorithm: "HS256" }, (err, user) => {
      if (err) {
        return res.status(500).json({ error: "Not Authorized" });
      }
      res.locals.id = user.id;
      return next();
    });
  } else {
    return res.status(500).json({ error: "Not Authorized" });
  }
};

module.exports = isAuthenticated;
