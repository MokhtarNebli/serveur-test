const express = require("express");
const { register, login } = require("../controllers/personControllers");
const { authMidedleware } = require("../middlewares/athMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", authMidedleware, (req, res) => {
  res.json(req.personId);
});
module.exports = router;
