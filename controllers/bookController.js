const Book = require("../models/Book");
module.exports = {
  getBooks: async (req, res) => {
    try {
      const books = await Book.find();
      res.render("index", { books: books });
    } catch (error) {
      console.log(error);
    }
  },

  getBookById: async (req, res) => {
    try {
      const id = req.params.id;
      await Task.findById({ _id: id });
      res.redirect("/:id");
    } catch (error) {
      console.log(error);
    }
  },

  createBook: async (req, res) => {
    try {
      await Book.create({
        bookTitle: req.body.bookTitle,
        bookAuthor: req.body.bookAuthor,
        bookDescription: req.body.bookDescription,
        bookGenre: req.body.bookGenre,
      });
    } catch (error) {
      console.log(error);
    }
  },

  updateBook: async (req, res) => {
    try {
      const id = req.params.id;
      await Book.findByIdAndUpdate(
        { id: _id },
        {
          bookTitle: req.body.bookTitle,
          bookAuthor: req.body.bookAuthor,
          bookDescription: req.body.bookDescription,
          bookGenre: req.body.bookGenre,
        }
      );
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },

  deleteBook: async (req, res) => {
    try {
        const id = req.params.id
        await Book.findByIdAndDelete({_id: id});
        res.redirect("/")
    } catch (error) {
      console.log(error);
    }
  },
};
