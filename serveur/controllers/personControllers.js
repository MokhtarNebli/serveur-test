const Person = require("../models/personModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    const existEmail = await Person.findOne({ email });

    if (existEmail) return res.status(400).json({ msg: "Email aleady exist." });

    const hashedPw = await bcrypt.hash(password, 10);
    const newUser = await Person.create({
      name,
      email,
      password: hashedPw,
      address,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.json({ newUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong !" });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await Person.findOne({ email, });

    if (!existUser)
      return res.status(400).json({ msg: "You shouled register first." });
    const checkPw = await bcrypt.compare(existUser.password, password);
    if (!checkPw)
      return res.status(400).json({ msg: "Wrong password, Try again !" });
    const token = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ existUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong !" });
  }
};

// @desc register a new person
// @params Post /api/person/register
// @access PUBLIC
