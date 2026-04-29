const { Router } = require("express");
const User = require("../model/User");
const config = require('../config/config');
const jwt = require('jsonwebtoken');

const router = Router();

// POST /auth/login - User sign-in
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user){
      // return res.status(404).json({ error: "User not found" });
      throw new Error("Erro ao fazem login");
    }

    const valid = await user.isValidPassword(req.body.password);
    if (!valid) {
      // return res.status(401).json({ error: "Invalid credentials" });
      throw new Error("Erro ao fazem login");
    }

    const token = jwt.sign({ _id: user.id }, config.jwtSecret);
    res.cookie("t", token, { httpOnly: true, maxAge: 3600000 });

    return res.status(200).render('/');
  } catch (error) {
    throw new Error("Erro ao fazem login");
  }
});

// /auth/login
router.get('/login', (req, res) => {
  try {
    res.status(200).render('./pages/login', { title: "Login" });
  } catch (error) {
    // res.status(500).json({ message: "Error ", error: error.message });
    console.log(error);
    throw new Error("Erro ao fazem login");
  }
});

// GET /auth/logout - User sign-out
router.get('/logout', (req, res) => {
  res.clearCookie("t");
  return res.status(200).redirect('/');
});

module.exports = router;