const express = require("express");
const Book = require("../model/bookModel");
const User = require("../model/bookModel");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Issue = require("../model/issueModel");

// Issue book to patron
router.post("/issue-new-book", authMiddleware, async (req, res) => {
  try {
    // Inventory adjustment (Available copies will be decrease by 1)
    await Book.findOneAndUpdate(
      { _id: req.body.book },
      { $inc: { availableCopies: -1 } }
    );

    // Add new book
    const addIssue = new Issue(req.body);
    await addIssue.save();
    return res.send({
      success: true,
      msg: "Book issued successfully",
      data: addIssue,
    });
  } catch (err) {
    return res.send({
      success: false,
      msg: err.message,
    });
  }
});

// Get all issues
router.post("/get-issues", authMiddleware, async (req, res) => {
  try {
    console.log(req.body);
    const getAllIssues = await Issue.find(req.body)
      .populate("book")
      .populate("user");
    return res.send({
      success: true,
      msg: "Issues fetched successfully",
      data: getAllIssues,
    });
  } catch (err) {
    return res.send({
      success: false,
      msg: err.message,
    });
  }
});

// Get issues by book
router.get("/get-issues-by-book/:id", authMiddleware, async (req, res) => {
  try {
    const getIssuesById = await Issue.find({ book: req.params.id })
      .populate("book")
      .populate("user");
    return res.send({
      success: true,
      msg: "Issues fetched successfully",
      data: getIssuesById,
    });
  } catch (err) {
    return res.send({
      success: false,
      msg: err.message,
    });
  }
});

module.exports = router;
