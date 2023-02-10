const bookController = require("../controllers/bookController");
const express = require("express");
const router = express.Router();

router.get("/", bookController.getBooks);
router.post("/", bookController.createBook);
router.put("/editBook/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);
router.get("/editBook/:id", bookController.getBookById);

module.exports = router;
