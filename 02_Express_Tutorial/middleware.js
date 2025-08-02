const express = require('express');
const app = express();


// https://expressjs.com/en/guide/using-middleware.html#middleware.application
// define middleware function:
const myFirstMiddleware = (req, res, next) => {
  console.log('this first middleware will run on every request');
  //next() will call each app.get('/') and app.get('/about')
  next();
}

app.use(myFirstMiddleware);

app.get('/', (req, res) => {
  res.send('Home page');
})

app.get('/about', (req, res) => {
  res.send('About page');
})

app.listen(3000, () => {
  console.log('Server is now running at port 3000');
})
