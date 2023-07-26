const express = require("express");
const Book = require("../model/bookModel");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Add book
router.post("/add-book", authMiddleware, async (req, res) => {
  try {
    const addBook = new Book(req.body);
    await addBook.save();
    return res.status(201).send({
      success: true,
      msg: "Book added successfully",
    });
  } catch (err) {
    return res.send({
      success: false,
      msg: err.message,
    });
  }
});

// Update book
router.put("/update-book/:id", authMiddleware, async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).send({
      success: true,
      msg: "Book updated successfully",
    });
  } catch (err) {
    return res.send({
      success: false,
      msg: err.message,
    });
  }
});

// Delete book
router.delete("/delete-book/:id", authMiddleware, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      msg: "Book deleted successfully",
    });
  } catch (err) {
    return res.send({
      success: false,
      msg: err.message,
    });
  }
});

// Get all books
router.get("/get-all-books", authMiddleware, async (req, res) => {
  try {
    const getAllBooks = await Book.find().sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      data: getAllBooks,
    });
  } catch (err) {
    return res.send({
      success: false,
      msg: err.message,
      data: getAllBooks,
    });
  }
});

// Get one book
router.get("/get-single-book/:id", authMiddleware, async (req, res) => {
  try {
    const getOneBook = await Book.findById(req.params.id);
    return res.status(200).send({
      success: true,
      data: getOneBook,
    });
  } catch (err) {
    return res.send({
      success: false,
      msg: err.message,
    });
  }
});

module.exports = router;
