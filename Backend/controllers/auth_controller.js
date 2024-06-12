const User = require("../config/models/user_model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

//jwt token generate
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const addUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await User.signUp(email, password, name);
    const token = createToken(user._id);
    res.status(200).json({ email, token,name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const signInUser = await User.signIn(email, password);
    const token = createToken(signInUser._id);
    res.status(200).json({ email, token,name });
  } catch (error) {
    res.status(400).json({error:error.message})
  }
};

module.exports = {addUser,loginUser};
