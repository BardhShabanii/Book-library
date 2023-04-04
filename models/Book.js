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

// // Add a static method to the book schema for searching books
// bookSchema.statics.search = function (searchTerm) {
//   // Use a regular expression to search for books that contain the given search term in the title, author, or genre fields
//   const regex = new RegExp(searchTerm, "i");
//   return this.find({
//     $or: [{ bookTitle: regex }, { bookAuthor: regex }, { bookGenre: regex }],
//   });
// };

bookSchema.index({ bookTitle: "text", bookAuthor: "text", bookGenre: "text" });

module.exports = mongoose.model("Book", bookSchema);
