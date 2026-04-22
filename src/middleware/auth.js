const jwt = require('jsonwebtoken');
const config = require('../config/config');

const requireAuth = (req, res, next) => {
  const token = req.cookies.t;

  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        req.userId = null;
        return next();
        // return res.status(400).json({ error: "Token Not Verificated" });
      }
      console.log(decoded);
      req.userId = decoded._id;
      next();
    });
  } else {
    req.userId = undefined;
    return next();
  }
}

module.exports = requireAuth;