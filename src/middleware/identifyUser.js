const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../model/User');

const identifyUser = async (req, res, next) => {
  const token = req.cookies.t;
  res.locals.user = null;

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    const user = await User.findById(decoded._id).select("name");

    if (user) {
      req.user = user;
      res.locals.user = user;
      return next();
    }

  } catch (error) {
    console.log("Token invalido");
  }
  next();
}

module.exports = identifyUser;