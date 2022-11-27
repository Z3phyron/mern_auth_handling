const express = require("express");
const router = express.Router();
const {
  SignUpUser,
  SignInUser,
  GetMe,
  UpdateMe,
  RefreshToken,
  GetUser,
} = require("../controllers/authCtrl");
const { verifyAccessToken } = require("../helpers/jwt_helper");

router.route("/").post(SignUpUser);

router.route("/signin").post(SignInUser);

router
  .route("/me")
  .get(verifyAccessToken, GetMe)
  .put(verifyAccessToken, UpdateMe);

router.route("/info").post(GetUser);

router.route("/refresh").get(RefreshToken);

module.exports = router;
