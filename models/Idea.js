const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    votesCount: { type: Number, default: 0 },
    voters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Idea", ideaSchema);
