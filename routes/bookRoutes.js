const bookController = require("../controllers/bookController");
const express = require("express");
const router = express.Router();

router.get("/", bookController.getBooks);

module.exports = router;
