const { Router } = require("express");
const secure = require("../middleware/secure");
const postController = require("../controllers/postController");

const router = Router();

//* GET /posts - Get all posts
router.get('/', postController.getAllPosts);

//* POST /posts - publish one post
router.post('/', secure, postController.createPost);

//* GET /posts/new - Page add Post
router.get('/new', secure, postController.getCreatePost);

//* GET /posts/:id - Get one post and your comments
router.get('/:postId', postController.getOnePost);

//* POST /posts/postId/comments - publish one comments
router.post('/:postId/comments', secure, postController.addComment);

//* PUT /posts/postId - Edit one post
router.put('/:postId', secure, postController.updatePost);

//* GET /posts/:postId/edit  - Render the Edit Post Page
router.get('/:postId/edit', secure, postController.getUpdatePost);

module.exports = router;