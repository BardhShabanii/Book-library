const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookTitle: {
    type: String,
    required: true,
  },
  bookAuthor: {
    type: String,
    required: true,
  },
  bookDescription: {
    type: String,
    required: true,
  },
  bookGenre: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
bookSchema.index({ bookTitle: "text", bookAuthor: "text", bookGenre: "text" });

module.exports = mongoose.model("Book", bookSchema);
