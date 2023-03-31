const Book = require("../models/Book");
const User = require("../models/User");
const passport = require("passport");
const validator = require("validator");

module.exports = {
  getHome: async (req, res) => {
    try {
      const userId = req.user._id; // get user ID of currently logged in user
      const books = await Book.find({ user: userId }); // retrieve books added by the user
      res.render("index", { books, userName: req.user.userName, userId }); //, userId:req.user._id me krahasu nfront id
    } catch (err) {
      console.log(err);
    }
  },

  getSignUp: (req, res) => {
    if (req.user) {
      return res.redirect("/");
    }
    res.render("signup", {
      title: "Create Account",
    });
  },

  postSignUp: (req, res, next) => {
    const validationErrors = [];
    if (!validator.isEmail(req.body.email))
      validationErrors.push({ msg: "Please enter a valid email address." });
    if (!validator.isLength(req.body.password, { min: 8 }))
      validationErrors.push({
        msg: "Password must be at least 8 characters long",
      });
    if (req.body.password !== req.body.confirmPassword)
      validationErrors.push({ msg: "Passwords do not match" });

    if (validationErrors.length) {
      req.flash("errors", validationErrors);
      return res.redirect("../signup");
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    });

    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });

    User.findOne(
      { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
      (err, existingUser) => {
        if (err) {
          return next(err);
        }
        if (existingUser) {
          req.flash("errors", {
            msg: "Account with that email address or username already exists.",
          });
          return res.redirect("../signup");
        }
        user.save((err) => {
          if (err) {
            return next(err);
          }
          req.logIn(user, (err) => {
            if (err) {
              return next(err);
            }
            res.redirect("/");
          });
        });
      }
    );
  },

  getLogin: (req, res) => {
    if (req.user) {
      return res.redirect("/");
    }
    res.render("login", {
      title: "Login",
    });
  },

  postLogin: (req, res, next) => {
    const validationErrors = [];
    if (!validator.isEmail(req.body.email))
      validationErrors.push({ msg: "Please enter a valid email address." });
    if (validator.isEmpty(req.body.password))
      validationErrors.push({ msg: "Password cannot be blank." });

    if (validationErrors.length) {
      req.flash("errors", validationErrors);
      return res.redirect("/login");
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    });

    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        req.flash("errors", info);
        return res.redirect("/login");
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", { msg: "Success! You are logged in." });
        res.redirect(req.session.returnTo || "/");
      });
    })(req, res, next);
  },

  logout: (req, res) => {
    req.logout(() => {
      console.log("User has logged out.");
    });
    req.session.destroy((err) => {
      if (err)
        console.log(
          "Error : Failed to destroy the session during logout.",
          err
        );
      req.user = null;
      res.redirect("/");
    });
  },

  // getBooks: async (req, res) => {
  //   try {
  //     const books = await Book.find({ user: req.user.id }); //.sort({createdAt: "asc" })
  //     res.render("index", { books: books });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },

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
        user: req.user._id,
      });
      res.redirect("/");
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
