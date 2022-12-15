const User = require("../models/User");
const { verifyToken, verifyTokenAndManager, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

router.get("/manager", verifyTokenAndManager, (req, res)=>{
  res.status(200).json("you are either manager or admin");
});
router.get("/admin", verifyTokenAndAdmin, (req, res)=>{
  res.status(200).json("you are the admin");
});

router.get("/find", async (req,res)=>{
  try {
    const Users = await User.find();
    res.status(200).json(Users);
  } catch (err) {
    res.status(500).json(err);
  }
})
module.exports = router;
