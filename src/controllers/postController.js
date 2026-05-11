const Post = require("../model/Post");
const Comment = require("../model/Comment");

const postController = {
  getAllPosts: async (req, res, next) => {
    try {
      const { search = "", sort = "recent", page = 1 } = req.query;
  
      // Pagination
      const limit = 2; // Test
      const skip = (page - 1) * limit;
  
      // Filter
      const query = {};
      if (search) {
        query.title = { $regex: search, $options: "i" };
      }
  
      // Order
      let sortOption = { createdAt: -1 };
      if (sort === "comments") {
        sortOption = { commentsCount: -1}
      }
  
      const posts = await Post.find(query).sort(sortOption).skip(skip).limit(limit).populate({ path: "author", select: "_id name"}).lean();
      
  
      // Total para paginação
      const total = await Post.countDocuments(query);
      const totalPages = Math.ceil(total / limit);
  
      res.status(200).render('./pages/explore', { title: "Explorar", posts, search, sort, page: Number(page), totalPages });
    } catch (error) {
      console.log("Error: ", error.message);
      const err = new Error("Erro ao Buscar Todos os Posts");
      err.status = 400; 
      next(err);
    }
  },

  createPost: async (req, res, next) => {
    try {
      const newPost = await Post.create({
        title: req.body.title, 
        content: req.body.content,
        author: req.user.id,
        tags: req.body.tags ? req.body.tags.split(",").map(tag => tag.trim()) : [],
        imageUrl: req.body.imageUrl
      });
      res.redirect(`/posts/${newPost._id}`);
    } catch (error) {
      res.status(500).render('./pages/createPost', { title: "Criar Novo Post", error: error.errors });
    }
  },

  getCreatePost: async (req, res, next) => {
    try {
      res.status(200).render('./pages/createPost', { title: "Criar Novo Post", error: undefined });
    } catch (error) {
      console.log("Error: ", error.message);
      const err = new Error("Erro ao Renderizar Página de Criação de Posts");
      err.status = 400; 
      next(err);
    }
  },

  getOnePost: async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.postId).populate({ path: "author", select: "_id name" }).lean();
      
      if (!post) {
        const err = new Error("Post Não Encontrado!");
        err.status = 404; 
        return next(err);
      }
      
      const comments = await Comment.find({ post: req.params.postId }).sort({ createdAt: -1 }).populate({ path: "author", select: "_id name"}).lean();
      res.status(200).render('./pages/post', { title: post.title, post, comments });
    } catch (error) {
      console.log("Error: ", error.message);
      const err = new Error("Erro ao Renderizar Página de um Post");
      err.status = 400; 
      next(err);
    }
  },

  addComment: async (req, res, next) => {
    try {
  
      if (!req.body.text.trim()) {
        return res.redirect(`/posts/${req.params.postId}`);
      }
  
      await Comment.create({ text: req.body.text, author: req.user._id, post: req.params.postId });
      await Post.findByIdAndUpdate(req.params.postId, { $inc: { commentsCount: 1 } } ).lean();
      res.redirect(`/posts/${req.params.postId}`);
    } catch (error) {
      console.log("Error: ", error.message);
      const err = new Error("Erro ao Publicar um Comentário");
      err.status = 400; 
      next(err);
    }
  },

  updatePost: async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.postId).lean();

      if (!post) {
        const err = new Error("Post Não Encontrado!");
        err.status = 404; 
        return next(err);
      }

      if (post.author.toString() !== req.user.id) {
        const err = new Error("Acesso Negado");
        err.status = 403; 
        return next(err);
      }

      const updateData = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags
          ? req.body.tags.split(",").map(tag => tag.trim())
          : []
      };

      await Post.findByIdAndUpdate(
        req.params.postId,
        updateData,
        { runValidators: true }
      ).lean();
      res.status(200).redirect(`/posts/${req.params.postId}`);
    } catch (error) {
      console.log("Error: ", error.message);
      const err = new Error("Erro ao Editar um Post");
      err.status = 400; 
      next(err);
    }
  },

  getUpdatePost: async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.postId).lean();

      if (post.author.toString() !== req.user.id) {
        const err = new Error("Acesso Negado");
        err.status = 403; 
        return next(err);
      }

      res.status(200).render('./pages/editPost', { title: `Editar Post`, post });
    } catch (error) {
      console.log("Error: ", error);
      const err = new Error("Erro ao Renderizar Página de Edição de Posts");
      err.status = 400; 
      next(err);
    }
  }
}

module.exports = postController;