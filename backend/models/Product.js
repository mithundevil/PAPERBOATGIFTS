const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['frames', 'albums', 'mugs', 'polaroids', 'posters', 'Frames', 'Albums', 'Mugs', 'Polaroids', 'Posters'],
    },
    description: {
      type: String,
      required: true,
    },
    startingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    sizes: [
      {
        label: { type: String, required: true },
        price: { type: Number, required: true },
        dimensions: { type: String }, // Optional e.g., "4x4", "A3"
      },
    ],
    supportsCustomText: {
      type: Boolean,
      default: false,
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
