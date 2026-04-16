const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is Required"]
  },

  content: {
    type: String,
    required: [true, "Content is Required"]
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "Author is Required"]
  },
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);