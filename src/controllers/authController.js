const User = require("../model/User");
const config = require('../config/config');
const jwt = require('jsonwebtoken');

const authController = {
  login: async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      
      if (!user){
        return res.status(404).render('./pages/login', { title: "Login", error: "E-mail ou senha inválidos" });
      }

      const valid = await user.isValidPassword(req.body.password);
      if (!valid) {
        return res.status(401).render('./pages/login', { title: "Login", error: "E-mail ou senha inválidos" });
      }

      const token = jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: "1h" });
      res.cookie("t", token, { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", maxAge: 3600000 });

      return res.status(200).redirect('/');
    } catch (error) {
      const err = new Error("Erro ao Fazer Login");
      err.status = 400; 
      next(err);
    }
  },

  getLogin: (req, res, next) => {
    try {
      res.status(200).render('./pages/login', { title: "Login" });
    } catch (error) {
      const err = new Error("Erro ao Tentar Fazer Login");
      err.status = 400; 
      next(err);
    }
  },

  logout: (req, res) => {
    res.clearCookie("t");
    return res.status(200).redirect('/');
  }
}

module.exports = authController;