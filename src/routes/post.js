const { Router } = require("express");
const Post = require("../model/Post");
const requireAuth = require("../middleware/auth");

const router = Router();

// GET /posts - Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({}).populate("author", "name email");
    res.status(200).json(posts);
  } catch (error) {
    console.log("Error: ", error.message);
  }
});

// POST /posts - publish one post
router.post('/', requireAuth, async (req, res) => {
  try {
    const newPost = await Post.create({ ...req.body, author: req.userId });
    res.status(200).json(newPost);
  } catch (error) {
    console.log("Error: ", error.message);
  }
});

// GET /posts/:id - Get one posts
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name email");
    res.status(200).json(post);
  } catch (error) {
    console.log("Error: ", error.message);
  }
});

module.exports = router;