const bookController = require("../controllers/bookController");
const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middlewares/auth");

router.get("/", ensureAuth, bookController.getHome);
router.get("/login", bookController.getLogin);
router.post("/login", bookController.postLogin);
router.get("/logout", bookController.logout);
router.get("/signup", bookController.getSignUp);
router.post("/signup", bookController.postSignUp);

// router.get("/books", bookController.getBooks);
router.put("/editBook/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);
router.get("/editBook/:id", bookController.getBookById);
router.get("/addBook", bookController.getCreatePage);
router.post("/addBook", bookController.createBook);
router.get("/getBook", bookController.getByName);

module.exports = router;
