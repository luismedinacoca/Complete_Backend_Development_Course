# 1. Create BookStore-API Project
# 2. Install dependnecy:
```bash
npm init -y
```
# 3. Create `server.js` file

# 4. Update `package.json` file
```json
{
  "name": "06_bookstore-api",
  "version": "1.0.0",
  "description": "",
  "main": "server.js", //👈🏽
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "server.js" //👈🏽
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs"
}
```
# 5. Install `nodemon`:
```bash
npm i nodemon --save-dev
```
# 6. Install `express`, `mongoose` and `dotenv`:
```bash
npm i express mongoose dotenv
```
# 7. Create Project structure folder as:
```
06_BookStore-API/
├── controllers/ 
├── database/
│   └── db.js  
├── models/
├── node_modules/
│   └── ....
├── routes/
├── .env
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

# 8. Add to `server.js` file:
```js
require('dotenv').config();
const express = require('express');

dotenv.config();

const  app = express();
const PORT = process.env.PORT || 3000;  //by default!

//connect to out database:
...

app.listen(PORT, () => {
})
```

# 9. Add in `db.js` file:
```js
const mongoose =require('mongoose');
const connectToDB = async() => {
  try{
    await mongoose.connect(`mongodb+srv://luismedinacoca:${process.env.CLUSTER_PWD}@cluster0.jsoddpx.mongodb.net/`)
    console.log("Mongodb is connected Successfully!")
  }
  catch(err){
    console.error('Mongodb connection failed', err);
    process.exit(1);
  }
}
module.exports=  connectToDB;
```

# 10. Go back to `server.js`:
```js
require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db');
const  app = express();
const PORT = process.env.PORT || 3000;
//connect to out database:
connectToDB();
// middleware:
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server is NOW running on port ${PORT}`);
})
```

# 11. Create `Book` model:
```js
const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true,
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
```
# 12. Create `book-routes.js` file:
```js
const express = require('express');
// create express router
const router =  express.Router();
// all routes that are related o bookss only.
router.get('/get', );
router.get('/get/:id', );
router.post('/add', );
router.put('/update/:id', );
router.delete('/delete/:id', );
module.exports = router;
```


# 13. Create `book-controller.js` file:
```js
const getAllBooks = async(req, res) => {}
const getSingleBookById = async(req, res) => {}
const addNewBook = async(req, res) => {}
const updateBook = async(req, res) => {}
const deleteBook = async(req, res) => {}
module.exports = {
  getAllBooks,
  getSingleBookById,
  addNewBook,
  updateBook,
  deleteBook,
}
```

## 13.1. import the `book-controller.js` file to `book-routes.js` file:
```js
const express = require('express');
const { getAllBooks, getSingleBookById, addNewBook, updateBook, deleteBook } = require('../controllers/book-controller');
// create express router
const router =  express.Router();
// all routes that are related o bookss only.
router.get('/get', getAllBooks);
router.get('/get/:id', getSingleBookById);
router.post('/add', addNewBook);
router.put('/update/:id', updateBook);
router.delete('/delete/:id', deleteBook);
module.exports = router;
```

# 14. import `router` to `server.js`
```js
require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db');
const bookRoutes = require('./routes/book-routes'); //👈🏽
const  app = express();
const PORT = process.env.PORT || 3000;
//connect to out database:
connectToDB();
// middleware -> to parse the request body: express.json()
app.use(express.json());
// routes here:
app.use('/api/books', bookRoutes); //👈🏽
app.listen(PORT, () => {
  console.log(`Server is NOW  running on port ${PORT}`);
})
```

# 15. Update each. callback from  `book-controller` file:
## Sequence: addNewBook > getAllBooks > getSingleBookById > updateBook > deleteBook
## 15.1 Update `addNewBook` callback:
```js
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

  }
}
```
### Running from Postman:
<img src="./images/addNewBook_request.png" alt="">

## 15.2 Update `getAllBooks` callback:
```js
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
```
<img src="./images/getAllBooks_request.png" alt="getAllBooks">

## 15.3 Update `getSingleBookById` callback:
```js
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
``` 

## 15.4 Update `deleteBook` callback:
```js
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
```
## 15.5 Update `updateBook`  callback:
```js
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
      message: `Book ith ID ${id} updated successfully!`,
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
```
