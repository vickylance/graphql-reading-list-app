const mongoose = require('mongoose');

const Author = new mongoose.Schema({
  name: String,
  age: Number,
});

module.exports = new mongoose.model('Author', Author, 'Authors');
