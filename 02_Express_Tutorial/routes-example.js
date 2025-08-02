const express = require('express');
const app = express();

//root route:
app.get('/', (req, res) => {
  res.send('Welcome to our Home page');
});

// get all products:
app.get('/products', (req,res) => {
  const products = [
    {id: 1, label: 'Product 1'},
    {id: 2, label: 'Product 2'},
    {id: 3, label: 'Product 3'},
    {id: 4, label: 'Product 4'}
  ]
  res.json(products);
});

// get a single product:
app.get('/products/:productId', (req, res) => {
  console.log("req.params: ", req.params);
  const productId = parseInt(req.params.productId);
  const products = [
    {id: 1, label: 'Product 1'},
    {id: 2, label: 'Product 2'},
    {id: 3, label: 'Product 3'},
    {id: 4, label: 'Product 4'}
  ]
  const getSingleProduct = products.find(product => product.id === productId);
  
  if(getSingleProduct){
    res.json(getSingleProduct);
  } else {
    res.status(404).json({message: 'Product not found! Please try with different ID'});
  }
})
/*
> '/products/:id'
Server is now running at port 3000
req.params:  [Object: null prototype] { id: '2' } 

> '/products/:productId'
Server is now running at port 3000
req.params:  [Object: null prototype] { productId: '2' }
*/


// ports:
const port = 3000;
app.listen(port, () => {
  console.log(`Server is now running at port ${port}`);
});
