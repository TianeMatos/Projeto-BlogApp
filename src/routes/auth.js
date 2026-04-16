const { Router } = require("express");
const User = require("../model/User");
const config = require('../config/config');
const jwt = require('jsonwebtoken');

const router = Router();

// POST /auth/signin - User sign-in
router.post('/auth/signin', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user){
      return res.status(404).json({ error: "User not found" });
    }

    const valid = await user.isValidPassword(req.body.password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user.id }, config.jwtSecret);
    res.cookie("t", token, { httpOnly: true, maxAge: 3600000 });

    return res.status(200).json({ message: "OK", token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// GET /auth/signout - User sign-out
router.get('/auth/signout', (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({ message: "Signed Out", cookie: req.cookies });
});

module.exports = router;