const { Router } = require("express");
const secure = require("../middleware/secure");
const userController = require("../controllers/userController");

const router = Router();

//* POST /users/register - Register a User in the DataBase 
router.post("/register", userController.register);

//* GET /users/register - Render the Register Page
router.get("/register", userController.getRegister);

// GET /users - List all users - Not Using
// router.get('/', userController.getAllUsers);

//* GET /users/:id - Fetch a User in the DataBase and Render Page Perfil
router.get('/:userId', secure, userController.getOneUser);


//* PUT /users/:userId - Update a User in the DataBase
router.put('/:userId', secure, userController.updateUser);

//* GET /users/:userId/edit  - Render the Edit Perfil Page
router.get('/:userId/edit', secure, userController.getUpdateUser);

// DELETE /users/:id/deleteUser - Delete a user in the DataBase
// router.delete('/:userId/deleteUser', userController.deleteUser);

module.exports = router;