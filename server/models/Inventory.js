const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  item_id: {
    type: String,
    required: true,
  },
  location_id: {
    type: String,
    required: true,
  },
  item_count: {
    type: Number,
    default: 0,
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

module.exports = mongoose.model("inventory", InventorySchema);
