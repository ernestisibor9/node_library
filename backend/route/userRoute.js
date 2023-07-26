const express = require("express");
const User = require("../model/userModel");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

// Register user
router.post("/register", async (req, res) => {
  try {
    const findIfUserExists = await User.findOne({
      email: req.body.email,
    });
    if (findIfUserExists) {
      return res.send({
        success: false,
        msg: "You have already registered",
      });
    } else {
      if (req.body.name.length < 2) {
        return res.send({
          success: false,
          msg: "Name should be more than two characters long",
        });
      }
      // Hash Password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashPassword;
      // Insert user into database
      const addUser = new User(req.body);
      await addUser.save();
      return res.status(200).send({
        success: true,
        msg: "User successfully registered",
      });
    }
  } catch (err) {
    return res.send({
      success: false,
      msg: err.message,
    });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const findIfUserExists = await User.findOne({ email: req.body.email });
    if (!findIfUserExists) {
      return res.send({
        success: false,
        msg: "User does not exist",
      });
    } else {
      // Compare Password
      const comparePassword = await bcrypt.compare(
        req.body.password,
        findIfUserExists.password
      );
      if (!comparePassword) {
        return res.send({
          success: false,
          msg: "Invalid Password",
        });
      }
      // Get token
      const token = jwt.sign(
        { userId: findIfUserExists._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      // Save token
      return res.send({
        success: true,
        msg: "User successfully login",
        data: token,
      });
    }
  } catch (err) {
    return res.send({
      success: false,
      msg: err.message,
    }); //
  }
});

// To get the userId
router.post("/get-user-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (user) {
      res.send({
        success: true,
        msg: "User details fetched successfully",
        data: user,
      });
    }
  } catch (err) {
    res.send({
      success: false,
      msg: err.message,
    });
  }
});

// Get all the users (patrons)
router.get("/get-all-users/:role", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({ role: req.params.role });
    if (users) {
      res.send({
        success: true,
        msg: "User fetched successfully",
        data: users,
      });
    }
  } catch (err) {
    res.send({
      success: false,
      msg: err.message,
    });
  }
});

// Get single user id
router.get("/get-user-by-id/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.send({
        success: false,
        msg: "User not found",
      });
    }
    return res.send({
      success: true,
      msg: "User details fetched successfully",
      data: user,
    });
  } catch (err) {
    res.send({
      success: false,
      msg: "User does not exist",
    });
  }
});

module.exports = router;
