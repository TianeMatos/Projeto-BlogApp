const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../model/User');

const requireAuth = async (req, res, next) => {
  const token = req.cookies.t;

  if (!token) {
    req.user = null;
    res.locals.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    const user = await User.findById(decoded._id).select("name email");

    if (!user) {
      req.user = null;
      res.locals.user = null;
      return next();
    }

    req.user = user;
    res.locals.user = user;

  } catch (error) {
    req.user = null;
    res.locals.user = null;
  }
  next();
}

module.exports = requireAuth;