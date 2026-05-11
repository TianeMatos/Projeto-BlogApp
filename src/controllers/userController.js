const User = require("../model/User");
const Post = require("../model/Post");

const userController = {
  register: async (req, res, next) => {
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
      const err = new Error("Erro ao Registrar Usuário");
      err.status = 400; 
      next(err);
    }
  },

  getRegister: async (req, res) => {
    res.status(200).render('./pages/register', { title: "Cadastro", error: {} });
  },
  
  //? Not Using
  // getAllUsers: async (req, res, next) => {
  //   try {
  //     const users = await User.find({}).lean();
  //     res.status(200).json({ message: `List of users (${users.length})`, users });
  //   } catch (error) {
  //     const err = new Error("Erro ao Listar usuários");
  //     err.status = 400; 
  //     next(err);
  //   }
  // },

  getOneUser: async (req, res, next) => {
    try {
      if (req.user.id !== req.params.userId) {
        const err = new Error("Acesso Negado! Você não tem permissão para acessar essa rota.");
        err.status = 403;
        return next(err);
      }

      const profileUser = await User.findById(req.params.userId).lean();
      const postOfUser = await Post.find({ author: profileUser._id }).lean();
      res.status(200).render('./pages/perfil', { title: `Perfil de ${profileUser.name}`, profileUser, posts: postOfUser });
    } catch (error) {
      const err = new Error("Erro ao Buscar usuário");
      err.status = 400; 
      next(err);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      if (req.user.id !== req.params.userId) {
        const err = new Error("Acesso Negado! Você não tem permissão para acessar essa rota.");
        err.status = 403;
        return next(err);
      }

      const updateData = {
        name: req.body.name,
        email: req.body.email,
        bio: req.body.bio
      };

      await User.findByIdAndUpdate(req.params.userId, updateData, { runValidators: true }).lean();
      res.status(200).redirect(`/users/${req.params.userId}`);
    } catch (error) {
      const err = new Error("Erro ao Atualizar Dados do usuário");
      err.status = 400; 
      next(err);
    }
  },

  getUpdateUser: async (req, res, next) => {
    try {

      if (req.user.id !== req.params.userId) {
        const err = new Error("Acesso Negado! Você não tem permissão para acessar essa rota.");
        err.status = 403;
        return next(err);
      }

      const user = await User.findById(req.params.userId).lean();
      res.status(200).render('./pages/editPerfil', { title: `Editar Perfil`, user });
    } catch (error) {
      const err = new Error("Erro ao Renderizar Página de Editar Perfil");
      err.status = 400; 
      next(err);
    }
  },

  //? Not Using
  // deleteUser:  async (req, res, next) => {
  //   try {
  //     if (req.user.id !== req.params.userId) {
  //       const err = new Error("Acesso Negado! Você não tem permissão para acessar essa rota.");
  //       err.status = 403;
  //       return next(err);
  //     }
  //     const deletedUser = await User.findByIdAndDelete(req.params.userId).select({ _id: 0, name: 1, email: 1, createdAt: 1, updatedAt: 1 });
  //     res.status(200).json({ message: "Deleted User", deletedUser });
  //   } catch (error) {
  //     const err = new Error("Erro ao Deletar usuário");
  //     err.status = 400; 
  //     next(err);
  //   }
  // }
}

module.exports = userController;