const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  img: String,
  title: String,
  date: String,
  by:String
})

const Post = new mongoose.model('post', postSchema);

module.exports = Post