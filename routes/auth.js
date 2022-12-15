const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    // console.log(user);
    if (!user) {
      return res.json("Wrong Credentials");
      
    }
    const hashedPw = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const originalpassword = hashedPw.toString(CryptoJS.enc.Utf8);

    if (originalpassword != req.body.password) {
      return res.json("Wrong Credentials");
      
    }

    const accesstoken = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SEC,
      {expiresIn:"3d"}
    );
    const { password, ...others } = user._doc;
      
    res.json({...others, accesstoken});
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
