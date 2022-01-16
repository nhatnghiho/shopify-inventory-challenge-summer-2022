const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  item_id: {
    type: String,
    required: true,
    unique: true,
  },
  item_name: { 
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  cost: { 
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("item", ItemSchema);
