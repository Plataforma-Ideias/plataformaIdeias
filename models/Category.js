const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    default: "#cccccc",
  },
});

module.exports = mongoose.model("Category", categorySchema);
