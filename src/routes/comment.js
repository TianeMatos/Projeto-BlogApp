const { Router } = require("express");
const Comment = require("../model/Comment");
const requireAuth = require("../middleware/auth");

const router = Router();

// GET /posts/postId/comments - Get all comments
router.get('/:postId/comments', async (req, res) => {
  try {
    const comments = await Comment.find({}).populate({ path: "author", Select: "name email"}).populate({ path: "post", Select: "title"});
    res.status(200).json(comments);
  } catch (error) {
    console.log("Error: ", error.message);
  }
});

// POST /posts/postId/comments - publish one comments
router.post('/:postId/comments', requireAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({ text: req.body.text, author: req.userId, post: req.params.postId });
    res.status(200).json(newComment);
  } catch (error) {
    console.log("Error: ", error.message);
  }
});

module.exports = router;