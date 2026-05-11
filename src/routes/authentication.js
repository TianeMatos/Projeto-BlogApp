const { Router } = require("express");
const authController = require("../controllers/authController");

const router = Router();

// POST /auth/login - User sign-in
router.post('/login', authController.login);

// /auth/login
router.get('/login', authController.getLogin);

// GET /auth/logout - User sign-out
router.get('/logout', authController.logout);

module.exports = router;