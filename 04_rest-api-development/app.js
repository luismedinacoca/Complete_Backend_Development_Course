const express = require('express');
const app = express();

//middleware
app.use(express.json());

let books = [
  {
    id: "1",
    title: "Book 1",
  },
  {
    id: "2",
    title: "Book 2",
  },
];

// intro route:
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to our bookstore api",
  });
});

// GET all books:
app.get('/books', (req,res) => {
  res.json(books);
})

// GET a single book:
app.get('/books/:id', (req, res) => {
  const book = books.find(book => book.id === req.params.id);
  if(book){
    res.status(200).json(book);
  } else {
    res.status(404).json({
      message: "Book not found!",
    })
  }
})

// POST a new Book:
app.post('/add', (req, res) =>  {
  const newBook = {
    //id: `${books.length + 1}`, // generate a new id => increment the length of the books array
    id: `${Math.floor(Math.random() * 1000000)}`, // generate a random id in String type
    title: `Book ${Math.floor(Math.random() * 1000000)}`,
  }
  books.push(newBook); // add the new book to the books array
  res.status(201).json({  // payload
    data: newBook,
    message: "Book created successfully!",
  }); // send the new book to the client
})


// PUT update a book:
app.put('/update/:id', (req, res) => {
  const findCurrentBook = books.find(book => book.id === req.params.id);
  if(findCurrentBook){
    findCurrentBook.title = req.body.title || findCurrentBook.title;

    // send the updated book to the client
    res.status(200).json({
      data: findCurrentBook,
      message: `Book with ID ${req.params.id} updated successfully!`,
    })
  } else {
    res.status(404).json({
      message: `Book with ID ${req.params.id} not found!`,
    })
  }
})

// DELETE a book:
app.delete('/delete/:id', (req, res) => {
  const findCurrentBook = books.find(book => book.id === req.params.id);
  if(findCurrentBook){
    books = books.filter(book => book.id !== req.params.id);
    res.status(200).json({
      message: `Book with ID ${req.params.id} deleted successfully!`,
      data: findCurrentBook,
    })
  } else {
    res.status(404).json({
      message: `Book with ID ${req.params.id} not found!`,
    })
  }
})


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
})

/**
 * Open VS Code
 * click on Thunder Client icon/extension
 * Collection: Book store Rest API
 * - GET: BookStore Index route
 * - GET: All books
 * - GET: Single Book
 */