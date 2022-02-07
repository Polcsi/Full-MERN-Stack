const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, UnauthenticatedError } = require("../errors");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  //compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Password");
  }
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { login };
