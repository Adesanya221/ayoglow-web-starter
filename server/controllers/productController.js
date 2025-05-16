import Product from '../models/Product.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const category = req.query.category;
    const skinType = req.query.skinType;
    const featured = req.query.featured === 'true';
    const natural = req.query.natural === 'true';
    
    const filters = {};
    
    if (category) filters.category = category;
    if (skinType) filters.skinType = { $in: [skinType] };
    if (featured) filters.isFeatured = featured;
    if (natural) filters.isNatural = natural;
    
    const products = await Product.find(filters);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      description,
      brand,
      category,
      price,
      countInStock,
      ingredients,
      benefits,
      isFeatured,
      isNatural,
      skinType
    } = req.body;

    const product = new Product({
      name,
      image,
      description,
      brand,
      category,
      price,
      countInStock,
      ingredients: ingredients || [],
      benefits: benefits || [],
      isFeatured: isFeatured || false,
      isNatural: isNatural || false,
      skinType: skinType || []
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      description,
      brand,
      category,
      price,
      countInStock,
      ingredients,
      benefits,
      isFeatured,
      isNatural,
      skinType
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.image = image || product.image;
      product.description = description || product.description;
      product.brand = brand || product.brand;
      product.category = category || product.category;
      product.price = price || product.price;
      product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
      product.ingredients = ingredients || product.ingredients;
      product.benefits = benefits || product.benefits;
      product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isNatural = isNatural !== undefined ? isNatural : product.isNatural;
      product.skinType = skinType || product.skinType;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
}; 