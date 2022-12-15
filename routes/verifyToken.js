const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        res.status(403).json("token is not valid");
        return;
      }
      req.user = user;
      console.log(user);
      next();
    });
  } else {
    return res.status(401).json("you are not authenticated");
  }
};

const verifyTokenAndManager = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role.toLowerCase() =="manager"|| req.user.role.toLowerCase() =="admin") {
      next();
    } else {
      res.status(403).json("you are not allowed");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role =="Admin") {
      next();
    } else {
      res.status(403).json("you are not allowed");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndManager, verifyTokenAndAdmin };
