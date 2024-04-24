import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
      type: String,
      required: true,
      unique: true
  },
  desc: {
      type: String,
      required: true
  },
  category: {
      type: String,
      required: true
  },
  variants: [{
      size: {
          type: String,
          required: true
      },
      price: {
          type: Number,
          required: true,
          min: 0
      },
      stock: {
          type: Number,
          required: true,
          min: 0
      },
      img: {
          type: String
      }
  }]
}, { timestamps: true });

export const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
