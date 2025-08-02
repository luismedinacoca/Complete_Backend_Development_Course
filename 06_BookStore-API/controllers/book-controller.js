const book = require('../models/book');
const Book = require('../models/book');

const getAllBooks = async(req, res) => {
  try {
    const allBooks =  await Book.find(); // .find() is a mongoose method that returns all the books in the database
    if(allBooks?.length > 0){
      res.status(200).json({
        success: true,
        message: 'List of Books fetch successfully!',
        data: allBooks
      })
    } else  {
      res.status(404).json({
        success: false,
        message: 'No books found in collection'
      })
    }
  } catch(err){
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'something went wrong! Please try again later.'
    })
  }
}
const getSingleBookById = async(req, res) => {
  try{
    //const getCurrentBookID = req.params.id;
    const {id} = req.params;
    //const bookDetailsByID = await Book.findById(getCurrentBookID);
    const bookDetailsByID = await Book.findById(id);
    if(!bookDetailsByID){
      return res.status(404).json({
        success: false,
        message: `Book with the current ID ${id} not found! Please try with different ID.`
      })
    }
    res.status(200).json({
      success: true,
      message: `Book with the current ID ${id} found successfully!`,
      data: bookDetailsByID
    })
  } catch(err){
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'something went wrong! Please try again later.'
    })
  }
}
const addNewBook = async(req, res) => {
  try {
    const newBookFormData = req.body;
    const newlyCreatedBook = await Book.create(newBookFormData);
    if(newBookFormData){
      res.status(201).json({
        success: true,
        message:  'Book added successfully!',
        data: newlyCreatedBook
      })
    }
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again later.'
    })
  }
}
const updateBook = async(req, res) => {
  try{
    const updatedBookFormData = req.body;
    const {id} = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, updatedBookFormData, {
      new: true,
    });
    if(!updatedBook){
      return res.status(404).json({
        success: false,
        message: `Book is not found with ID: ${id}.`
      })
    }
    res.status(200).json({
      success: true,
      message: `Book with ID ${id} updated successfully!`,
      data: updatedBook,
    })
  } catch(err){
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again later.'
    })
  }
}
const deleteBook = async(req, res) => {
  try {
    const {id} = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if(!deletedBook){
      res.status(404).json({
        success: false,
        message: `Book is not found with ID: ${id}.`
      })
    }
    res.status(200).json({
      succes: true,
      message:  `Book with the current ID ${id} deleted successfully! `,
      data: deletedBook,
    })
  } catch(err){
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again later.'
    })
  }
}

module.exports = {
  getAllBooks,
  getSingleBookById,
  addNewBook,
  updateBook,
  deleteBook,
}