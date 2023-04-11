const { generateToken } = require("../config/jwtToken");
const User = require("../models/usermodel");
const asyncHandler = require("express-async-handler");
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    //create a new User
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    // User Already Exists
    throw new Error("User Already Exists");
  }
});

const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Kiểm tra xem người dùng có tồn tại hay không
  const findUser = await User.findOne({ email });

  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Thông tin xác thực không hợp lệ");
  }
});
//get all users
const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// get a single user

const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
};
