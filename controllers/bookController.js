const Book = require("../models/Book");
module.exports = {
  getBooks: async (req, res) => {
    try {
      const books = await Book.find();//.sort({createdAt: "asc"})
      res.render("index", { books: books });
    } catch (error) {
      console.log(error);
    }
  },

  getBookById: async (req, res) => {
    try {
      const id = req.params.id;
      const book = await Book.findById({ _id: id });
      res.render("editBook", {
        title: "test",
        book: book,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getCreatePage: async (req, res) => {
    try {
      res.render("addBook", { title: "Add new book" });
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
      res.redirect("/")
    } catch (error) {
      console.log(error);
    }
  },

  updateBook: async (req, res) => {
    try {
      const id = req.params.id;
      await Book.findByIdAndUpdate(
        { _id: id },
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
      const id = req.params.id;
      await Book.findByIdAndDelete({ _id: id });
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },
};
