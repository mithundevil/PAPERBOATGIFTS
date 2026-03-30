const Product = require('../models/Product');
const sendResponse = require('../utils/sendResponse');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  console.log('--- GET PRODUCTS PROTOCOL INITIATED ---');
  try {
    const products = await Product.find({});
    console.log(`--- SUCCESS: ${products.length} ASSETS RETRIEVED ---`);
    sendResponse(res, 200, true, 'Products retrieved successfully', products);
  } catch (err) {
    console.error('--- PROTOCOL FAILURE: GET PRODUCTS ---', err);
    res.status(500);
    throw err;
  }
};

// @desc    Fetch products by category
// @route   GET /api/products/:category
// @access  Public
const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  const products = await Product.find({ 
    category: { $regex: new RegExp(`^${category}$`, 'i') } 
  });
  sendResponse(res, 200, true, `Products for category ${category} retrieved`, products);
};

// @desc    Fetch single product
// @route   GET /api/products/id/:id
// @access  Public
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    sendResponse(res, 200, true, 'Product found', product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  const { name, category, description, startingPrice, sizes, images, supportsCustomText, countInStock } = req.body;

  const product = new Product({
    name,
    category,
    description,
    startingPrice,
    sizes,
    images,
    supportsCustomText,
    countInStock: Number(countInStock) || 0
  });

  const createdProduct = await product.save();
  sendResponse(res, 201, true, 'Product created successfully', createdProduct);
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  const { name, category, description, startingPrice, sizes, images, supportsCustomText } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.category = category || product.category;
    product.description = description || product.description;
    product.startingPrice = startingPrice || product.startingPrice;
    product.sizes = sizes || product.sizes;
    product.images = images || product.images;
    product.supportsCustomText = supportsCustomText !== undefined ? supportsCustomText : product.supportsCustomText;
    product.countInStock = req.body.countInStock !== undefined ? Number(req.body.countInStock) : product.countInStock;

    const updatedProduct = await product.save();
    sendResponse(res, 200, true, 'Product updated successfully', updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    sendResponse(res, 200, true, 'Product removed successfully');
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
};

module.exports = {
  getProducts,
  getProductsByCategory,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
