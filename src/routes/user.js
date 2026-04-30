const { Router } = require("express");
const User = require("../model/User");
const identifyUser = require("../middleware/identifyUser");
const Post = require("../model/Post");
const secure = require("../middleware/secure");

const router = Router();

//* POST /users/register - Register a User in the DataBase 
router.post("/register", async (req, res) => {
     try {
          const body = req.body;
          const user = await User.create(body);
          res.status(200).redirect('/login');
     } catch (error) {

          if (error.name === 'ValidationError') {
               return res.status(400).render('./pages/register', {
                    title: "Cadastro",
                    error: error.errors
               });
          }

          if (error.code === 11000) {
               return res.status(400).render('./pages/register', {
                    title: "Cadastro",
                    error: { email: { message: "Este e-mail já está cadastrado." } }
               });
          }
          next(error);
     }
});

//* GET /users/register - Render the Register Page
router.get("/register", async (req, res) => {
     res.status(200).render('./pages/register', { title: "Cadastro" });
});

// GET /users - List all users - Not Using
router.get('/', async (req, res) => {
     try {
          const users = await User.find({});
          res.status(200).json({ message: `List of users (${users.length})`, users });
     } catch (error) {
          next(error);
     }
});

//* GET /users/:id - Fetch a User in the DataBase and Render Page Perfil
router.get('/:userId', secure, async (req, res) => {
     try {
          const profileUser = await User.findById(req.params.userId);
          const postOfUser = await Post.find({ author: profileUser._id });
          res.status(200).render('./pages/perfil', { title: `Perfil de ${profileUser.name}`, profileUser, posts: postOfUser });
     } catch (error) {
          next(error);
     }
});


//* PUT /users/:userId/edit - Update a User in the DataBase
router.put('/:userId/edit', secure, async (req, res) => {
     try {
          const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body);
          res.status(200).redirect(`/users/${req.params.userId}`);
     } catch (error) {
          next(error);
     }
});

//* GET /users/:userId/edit  - Render the Edit Perfil Page
router.get('/:userId/edit', secure, async (req, res) => {
     try {
          const user = await User.findById(req.params.userId);
          res.status(200).render('./pages/editPerfil', { title: `Editar Perfil`, user });
     } catch (error) {
          next(error);
     }
});

// DELETE /users/:id/deleteUser - Delete a user in the DataBase
router.delete('/:userId/deleteUser', async (req, res) => {
     try {
          const deletedUser = await User.findByIdAndDelete(req.params.userId).select({ _id: 0, name: 1, email: 1, createdAt: 1, updatedAt: 1 });
          res.status(200).json({ message: "Deleted User", deletedUser });
     } catch (error) {
          next(error);
     }
});

module.exports = router;