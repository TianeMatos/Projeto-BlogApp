const { Router } = require("express");
const User = require("../model/User");
const requireAuth = require("../middleware/auth");
const Post = require("../model/Post");

const router = Router();

//* POST /users/register - Register a User in the DataBase 
router.post("/register", async (req, res) => {
     try {
          const body = req.body;
          const user = await User.create(body);
          res.status(200).redirect('./pages/login');
     } catch (error) {
          res.status(500).render('./pages/register', { title: "Cadastro", error: error.errors });
     }
});

//* GET /users/register - Render the Register Page
router.get("/register", async (req, res) => {
     res.status(200).render('./pages/register', { title: "Cadastro", error: undefined });
});

// GET /users - List all users Not Using
router.get('/', async (req, res) => {
     try {
          const users = await User.find({});
          res.status(200).json({ message: `List of users (${users.length})`, users });
     } catch (error) {
          // res.status(500).json({ message: "Error listing the Users", error: error.message });
          throw new Error("Erro ao listar usuários");
     }
});

//* GET /users/:id - Fetch a User in the DataBase and Render Page Perfil
router.get('/:userId', requireAuth, async (req, res) => {
     try {
          const user = await User.findById(req.params.userId);
          const postOfUser = await Post.find({ author: user._id });
          res.status(200).render('./pages/perfil', { title: `Perfil de ${user.name}`, user, posts: postOfUser });
     } catch (error) {
          // res.status(500).json({ message: "Error showing the User", error: error.message });
          throw new Error("Erro ao mostrar perfil");
     }
});


//* PUT /users/:userId/edit - Update a User in the DataBase
router.put('/:userId/edit', requireAuth, async (req, res) => {
     try {
          const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body);
          res.status(200).redirect(`/users/${req.params.userId}`);
     } catch (error) {
          // res.status(500).json({ message: "Error Updating the User", error: error.message });
          throw new Error("Erro ao editar perfil");

     }
});

//* GET /users/:userId/edit  - Render the Edit Perfil Page
router.get('/:userId/edit', requireAuth, async (req, res) => {
     try {
          const user = await User.findById(req.params.userId);
          res.status(200).render('./pages/editPerfil', { title: `Editar Perfil`, user });
     } catch (error) {
          // res.status(500).json({ message: "Error Updating the User", error: error.message });
          throw new Error("Erro ao editar perfil");

     }
});

// DELETE /users/:id/deleteUser - Delete a user in the DataBase
router.delete('/:userId/deleteUser', async (req, res) => {
     try {
          const deletedUser = await User.findByIdAndDelete(req.params.userId).select({ _id: 0, name: 1, email: 1, createdAt: 1, updatedAt: 1 });
          res.status(200).json({ message: "Deleted User", deletedUser });
     } catch (error) {
          // res.status(500).json({ message: "Error Deleting the User", error: error.message });
          throw new Error("Erro ao editar perfil");

     }
});

module.exports = router;