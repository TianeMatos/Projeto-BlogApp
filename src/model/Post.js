const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "O título é necessário"]
  },

  content: {
    type: String,
    required: [true, "O conteúdo é necessário"]
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "O autor é necessário"]
  },
  
  commentsCount: { 
    type: Number, 
    default: 0 
  },

  tags: {
    type: Array
  },

  imageUrl: {
    type: String,
    required: [true, "A imagem é necessária"]
  }
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);