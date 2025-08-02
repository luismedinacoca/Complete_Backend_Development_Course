const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim:  true,
    maxLength: [100, 'Book title must be less than 100 characters']
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim:  true,
  },
  year: {
    type: Number,
    required: [true, 'Publication year is required'],
    min: [1000, 'Book year must be greater than 1000'],
    max: [new Date().getFullYear(), 'Book year must be less than or equal to the current year']
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model('Book', BookSchema);