import {Router} from "express";
import { loginController, otpsendController, otpVerifyController, registerController } from "../controller/auth.controller.js";
import checkUserExistance from "../middlewares/does-user-exist-check-middleware.js";
import verifyOtpJwt from "../middlewares/jwtSignedOtpTokenValidator.js";

const router=Router();

router.route("/sendOtp").post(checkUserExistance,otpsendController);
router.route("/verifyOtp").post(otpVerifyController);
router.route("/register").post(verifyOtpJwt,registerController);
router.route("/login").post(loginController);

export default router