const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const postData = async (req, res) => {
  const user = await User.create({ ...req.body });
  res
    .status(StatusCodes.CREATED)
    .json({ status: "success", user: { name: user.name } });
};

module.exports = { postData };
