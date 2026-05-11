const { Router } = require("express");
const User = require("../model/User");
const config = require('../config/config');
const jwt = require('jsonwebtoken');

const router = Router();

// POST /auth/login - User sign-in
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).lean();
    
    if (!user){
      return res.status(404).render('./pages/login', { title: "Login", error: "Erro ao Fazer Login" });
    }

    const valid = await user.isValidPassword(req.body.password);
    if (!valid) {
      return res.status(401).render('./pages/login', { title: "Login", error: "Erro ao Fazer Login" });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: "1h" });
    res.cookie("t", token, { httpOnly: true, sameSite: "strict", maxAge: 3600000 });

    return res.status(200).redirect('/');
  } catch (error) {
    console.log(error);
    const err = new Error("Erro ao Fazer Login");
    err.status = 400; 
    next(err);
  }
});

// /auth/login
router.get('/login', (req, res) => {
  try {
    res.status(200).render('./pages/login', { title: "Login" });
  } catch (error) {
    // res.status(500).json({ message: "Error ", error: error.message });
    console.log(error);
  }
});

// GET /auth/logout - User sign-out
router.get('/logout', (req, res) => {
  res.clearCookie("t");
  return res.status(200).redirect('/');
});

module.exports = router;