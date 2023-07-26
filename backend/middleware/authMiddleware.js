const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.send({
        success: false,
        msg: "Invalid token",
      });
    } else {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.body.userId = decodedToken.userId;
      next();
    }
  } catch (err) {
    return res.send({
      success: false,
      msg: err.message,
    });
  }
};
