const router = require('express').Router();
const Post = require('../model/Post');
const userRouter = require('./user');
const authRouter = require('./authentication');
const postRouter = require('./post');

// Page Home
router.get('/', async (req, res, next) => {
  try {
    const popularPosts = await Post.find({})
      .sort({ commentsCount: -1 })
      .limit(4)
      .populate("author", "name")
      .lean();

    res.status(200).render('./pages/home', { title: "Home", posts: popularPosts });
  } catch (error) {
    const err = new Error("Erro ao Renderizar Página Inicial");
    err.status = 500;
    next(err);
  }
});

// Page About 
router.get('/about', (req, res, next) => {
  try {
    res.status(200).render('./pages/about', { title: "Sobre" });
  } catch (error) {
    const err = new Error("Erro ao Renderizar Página Sobre");
    err.status = 500;
    next(err);
  }
});

// Sub-rotas
router.use('/posts', postRouter);
router.use('/users', userRouter);
router.use('/', authRouter)

module.exports = router;