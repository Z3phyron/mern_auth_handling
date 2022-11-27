const User = require("../models/User");
const createHttpError = require("http-errors");
const asyncHandler = require("express-async-handler");
const { upload } = require("../utils/cloudinary");
// const upload = require("../utils/multer");

const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwt_helper");
const { signInSchema, signUpSchema } = require("../helpers/validation_schema");

// @desc    Register new user
// @route   POST /api/auth
// @access  Public
const SignUpUser = asyncHandler(async (req, res) => {
  try {
    const result = await signUpSchema.validateAsync(req.body);

    const doesExist = await User.findOne({ email: result.email });
    if (doesExist) {
      throw createHttpError.Conflict(
        `${result.email} is already registered!!!`
      );
    }

    let user = new User(result);
    user = await user.save();

    //hide unnecessary fields
    user.password = undefined;
    user.__v = undefined;

    const accessToken = await signAccessToken(user._id);
    const refreshToken = await signRefreshToken(user._id);

    // existingUser.refreshToken = refreshToken;
    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    res.status(201).json({ accessToken });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Sign in user
// @route   POST /api/auth/signIn
// @access  Public
const SignInUser = asyncHandler(async (req, res) => {
  let user;
  try {
    const result = await signInSchema.validateAsync(req.body);
    user = await User.findOne({ email: result.email });
    if (!user) throw createHttpError.NotFound("User not found");

    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch)
      throw createHttpError.Unauthorized("Username/pasword not valid");

    //hide unnecessary fields
    user.password = undefined;
    user.__v = undefined;

    const accessToken = await signAccessToken(user._id);
    const refreshToken = await signRefreshToken(user._id);

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    Refresh user token
// @route   POST /api/auth/signIn
// @access  Public
const RefreshToken = asyncHandler(async (req, res, next) => {
  console.log(req.cookies.jwt);
  const refreshToken = req.cookies.jwt;
  try {
    // const { refreshToken } = req.cookie;
    if (!refreshToken) throw createHttpError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);
    const accToken = await signAccessToken(userId);
    const refToken = await signRefreshToken(userId);

    // res.send({ accToken, refToken });
    res.send({
      accessToken: accToken,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    get user info
// @route   GET /api/auth/getMe
// @access  Private
const GetUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  console.log(email);

  try {
    let user = await User.findOne({ email: email }).select(
      "-password -__v -createdAt -updatedAt"
    );
    console.log(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    get user info
// @route   GET /api/auth/getMe
// @access  Private
const GetMe = asyncHandler(async (req, res) => {
  const userId = req.payload.userId;
  // console.log(userId)

  try {
    let user = await User.findById(userId).select(
      "-password -__v -createdAt -updatedAt"
    );
    res.status(201).json(user);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    get user info
// @route   GET /api/auth/getMe
// @access  Private
const UpdateMe = asyncHandler(async (req, res) => {
  const userId = req.payload.userId;
  // console.log(req.body);
  const { street, city, country } = req.body;
  let userUpdate;
  if (req.files) {
    const { image } = req.files;
    const cloudFile = await upload(image.tempFilePath);
    // console.log(cloudFile);
    userUpdate = {
      profile_pic: cloudFile.secure_url,
      ...req.body,
      address: {
      ...req.body
      },
    };
  } else {
    userUpdate = {
      ...req.body,
      address: {
      ...req.body
      },
    };
  }

  try {
    let user = await User.findByIdAndUpdate(
      userId,
      {
        $set: userUpdate,
      },
      {
        new: true,
        useFindAndModify: true,
      }
    ).select("-password -__v -createdAt -updatedAt");
    res.status(201).json(user);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

module.exports = {
  SignUpUser,
  SignInUser,
  RefreshToken,
  GetMe,
  UpdateMe,
  GetUser,
};
