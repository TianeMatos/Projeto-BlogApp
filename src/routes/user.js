const { Router } = require("express");
const User = require("../model/User");
const requireAuth = require("../middleware/auth");

const router = Router();

// POST /register - User Sign-up  
router.post("/register", async (req, res) => {
  try {
      const body = req.body;
      const user = await User.create(body);
      res.status(200).redirect('./pages/login');
  } catch (error) {
      res.status(500).render('./pages/register', { title: "Cadastro", error: error.errors });
  }
});

// GET /register - Register Page
router.get("/register", async (req, res) => {
   res.status(200).render('./pages/register', { title: "Cadastro", error: undefined });
});

// GET /users - List all users
router.get('/', async (req, res) => {
 try {
      const users = await User.find({});
      res.status(200).json({ message: `List of users (${users.length})`, users });
 } catch (error) {
      res.status(500).json({ message: "Error listing the Users", error: error.message });
 }
});

// GET /users/:id - Fetch a user
router.get('/:id', requireAuth, async (req, res) => {
 try {
      const user = await User.findById(req.params.id);
      // req.profile.password = undefined;
      res.status(200).json({ message: "User", user });
 } catch (error) {
      res.status(500).json({ message: "Error showing the User", error: error.message });
 }
});

// PUT /users/:id - Update a user
router.put('/:id', async (req, res) => {
 try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" }).select({ _id: 0, name: 1, email: 1, createdAt: 1, updatedAt: 1 });
      res.status(200).json({ message: "Updated User", updatedUser });
 } catch (error) {
      res.status(500).json({ message: "Error Updating the User", error: error.message });
 }
});

// DELETE /users/:id - Delete a user
router.delete('/:id', async (req, res) => {
 try {
      const deletedUser = await User.findByIdAndDelete(req.params.id).select({ _id: 0, name: 1, email: 1, createdAt: 1, updatedAt: 1 });
      res.status(200).json({ message: "Deleted User", deletedUser });
 } catch (error) {
      res.status(500).json({ message: "Error Deleting the User", error: error.message });
 }
});

module.exports = router;