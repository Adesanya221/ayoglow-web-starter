import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    reviews: [reviewSchema],
    ingredients: [String],
    benefits: [String],
    isFeatured: { type: Boolean, default: false },
    isNatural: { type: Boolean, default: false },
    skinType: [String], // dry, oily, combination, sensitive, all
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product; 