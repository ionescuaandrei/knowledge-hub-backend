const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await User.findOne({
      email: email
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bycrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      role: role || "user",
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user){
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bycrypt.compare(password, user.password);
  if (!isMatch){
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.status(200).json({ token });

  res.json({
    token,
    user: {
      id: user._id,
      email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
