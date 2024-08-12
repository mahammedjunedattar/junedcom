const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema for size availability with numerical values
const SizeAvailabilitySchema = new Schema({
  S: { type: Number, default: 0 },
  M: { type: Number, default: 0 },
  L: { type: Number, default: 0 },
  XL: { type: Number, default: 0 },
  XXL: { type: Number, default: 0 }
}, { _id: false });

// Schema for sizes with string values

// Schema for colors, each with a color name, image, and availability
const SizeSchema = new Schema({
  size: { type: String, required: false },
  stock: { type: Number, default: 0 }
});

const ColorSchema = new Schema({
  color: { type: String, required: true },
  image: { type: String, required: true },
  availableQty: { type: SizeAvailabilitySchema, required: true }
}, { _id: false });

// Main Product schema
const ProductSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  category: { type: String, required: true },
  sizes: { type: [SizeSchema], required: false },
  colors: { type: [ColorSchema], required: true },
  availableQty: { type: Number, required: true }
});

module.exports = mongoose.models.jjsss || mongoose.model('jjsss', ProductSchema);
