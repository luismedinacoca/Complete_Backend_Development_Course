const Product = require('../models/product');

const getAllProducts = async(req, res) => {
  try{
    const allProducts = await Product.find();
    if(allProducts?.length > 0){
      res.status(200).json({
        success: true,
        message: "List of Products fetch successfully!",
        data: allProducts,
      })
    } else {
      res.status(404).json({
        success: false,
        message: "No product were found!"
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
const getSingleProductById = async(req, res) => {
  try{
    const {id} = req.params;
    const productDetailsByID = await Product.findById(id);
    if(!productDetailsByID){
      res.status(404).json({
        success: false,
        message: `Product with the current ID ${id} not found! Please try with different ID.`
      })
    } else {
      res.status(200).json({
        success: true,
        message: `Product with the current ID ${id} found successfully!`,
        data: productDetailsByID,
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
const addNewProduct = async(req, res) => {
  try{
    const newProductFormData = req.body;
    const newlyCreatedProduct = await Product.create(newProductFormData);
    if(newProductFormData){
      res.status(201).json({
        success: true,
        message:  'product added successfully!',
        data: newlyCreatedProduct
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
const updateProduct = async(req, res) => {
  try{
    const updatedProductFormData = req.body;
    const {id} = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedProductFormData, {
      new: true,
    });
    if(!updatedProduct){
      res.status(404).json({
        success:  false,
        message: `Product was not found with ID: ${id}.`,
      })
    } else {
      res.status(200).json({
        success: true,
        message: `Product with ID ${id} updated successfully!`,
        data: updatedProduct,
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
const deleteProduct = async(req, res) => {
  try{
    const {id} = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if(!deletedProduct){
      res.status(404).json({
        success: false,
        message: `Product was not found with ID: ${id}.`,
      })
    } else {
      res.status(200).json({
        success:  true,
        message: `Product with current ID ${id} successfully deleted!`,
        data: deletedProduct,
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

module.exports = {
  getAllProducts,
  getSingleProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
}