const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  text: {
    type: String,
    required: [true, "Text is Required"]
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "Author is Required"]
  },

  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, "Post is Required"]
  }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);