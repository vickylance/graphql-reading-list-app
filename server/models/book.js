const mongoose = require('mongoose');

const Book = new mongoose.Schema({
  name: String,
  genre: String,
  authorId: String,
});

module.exports = new mongoose.model('Book', Book, 'Books');
