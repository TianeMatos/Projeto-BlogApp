const { Router } = require("express");
const Post = require("../model/Post");
const requireAuth = require("../middleware/auth");
const Comment = require("../model/Comment");

const router = Router();

// GET /posts - Get all posts
router.get('/', async (req, res) => {
  try {
    const { search = "", sort = "recent", page = 1 } = req.query;

    // Pagination
    const limit = 2; // Test
    const skip = (page - 1) * limit;

    // Filter
    const query = {};
    if (search) {
      query.title = search;
    }

    // Order
    const sortOption = { createdAt: -1 };
    if (sort === "comments") {
      sortOption = { commentsCount: -1}
    }

    const posts = await Post.find({}).sort(sortOption).skip(skip).limit(limit).populate({ path: "author", Select: "name email"});

    // Total para paginação
    const total = await Post.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.status(200).render('./pages/explore', { title: "Explorar", posts, search, sort, page: Number(page), totalPages });
  } catch (error) {
    console.log("Error: ", error.message);
  }
});

// POST /posts - publish one post
router.post('/createPost', requireAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title, 
      content: req.body.content,
      author: req.user.id,
      tags: req.body.tags.trim().split(","),
      imageUrl: req.body.imageUrl
    });
    res.redirect(`/posts/${newPost._id}`);
  } catch (error) {
    res.status(500).render('./pages/createPost', { title: "Criar Novo Post", error: error.errors });
  }
});

// GET /posts/addPost - Page add Post
router.get('/createPost', requireAuth, async (req, res) => {
  try {
    res.status(200).render('./pages/createPost', { title: "Criar Novo Post", error: undefined });
  } catch (error) {
    console.log("Error: ", error.message);
  }
});

// GET /posts/:id - Get one post and your comments
router.get('/:postId', requireAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate({ path: "author", select: "name" });
    const comments = await Comment.find({ post: req.params.postId }).sort({ createdAt: -1 }).populate({ path: "author", Select: "name email"});
    res.status(200).render('./pages/post', { title: post.title, post, comments });
  } catch (error) {
    console.log("Error: ", error.message);
  }
});

// POST /posts/postId/comments - publish one comments
router.post('/:postId/comments', requireAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({ text: req.body.text, author: req.user._id, post: req.params.postId });
    await Post.findByIdAndUpdate(req.params.postId, { $inc: { commentsCount: 1 } } );
    res.redirect(`/posts/${req.params.postId}`);
  } catch (error) {
    console.log("Error: ", error.message);
  }
});

module.exports = router;