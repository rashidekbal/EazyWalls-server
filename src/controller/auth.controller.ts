import Express from "express";

import ApiError from "../common/apiError.js";
import { sendOtp } from "eazyotp";
import {
  authService,
  otpService,
  userService,
} from "../services/index.sevice.js";

import logger from "../utils/pino.js";
import { isValidEmail } from "../utils/Regex.js";
import { authResponse } from "../types/authResponse.js";
import serviceError from "../common/ServiceError.js";
import serviceErrorType from "../common/ErrorEnum.js";
const registerController = async (
  req: Express.Request,
  res: Express.Response,
) => {
  try {
    const email = req.auth?.email as string;
    if (!isValidEmail(email))
      return res.status(401).json(new ApiError("invalid auth token"));
    const password = req.body.password;
    if(password.length < 6)return res.status(400).json(new ApiError("password lenght must be of 6 letters atleast"))
    const result = await authService.register(email, password);
    return res.status(201).json({
      token: result.token,
      username: result.username,
      profile: result.profile,
    });
  } catch (error) {
    logger.error(error)
    return res.status(500).json(new ApiError("internal server error"));
  }
};
const loginController = async (req: Express.Request, res: Express.Response) => {
  try {
    const email = req.body.email as string;
    const password = req.body.password as string;
    if (!isValidEmail(email as string))
      return res.status(400).json("please provide a valid email");
    if (password.length < 6)
      return res
        .status(400)
        .json(new ApiError("password length must be of more than 6 letters"));
    let result: authResponse = await authService.login(email, password);
    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof serviceError) {
      switch (error.errorType) {
        case serviceErrorType.USER_NOT_FOUND:
          return res.status(401).json(error);
        case serviceErrorType.WRONG_PASSWORD:
          return res.status(401).json(error);
        default:
          logger.error(error.message);
          return res
            .status(401)
            .json(
              new serviceError(
                serviceErrorType.INTERNAL_SERVICE_ERROR,
                "internal server error",
              ),
            );
      }
    }
    logger.error(error as string);
    return res
      .status(401)
      .json(
        new serviceError(
          serviceErrorType.INTERNAL_SERVICE_ERROR,
          "internal server error",
        ),
      );
  }
};
const otpsendController = async (
  req: Express.Request,
  res: Express.Response,
) => {
  try {
    //no need to revalidate email already validated in middleware
    const email = req.body.email;
    await otpService.sendOtp(email);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json(new ApiError("something went wrong"));
  }
};
const otpVerifyController = async (
  req: Express.Request,
  res: Express.Response,
) => {
  try {
    const email = req.body?.email as string;
    const otp = req.body?.otp as number;
    if (!isValidEmail(email))
      return res.status(400).json(new ApiError("please provide a valid email"));
    if (isNaN(otp))
      return res.status(400).json(new ApiError("please provide otp"));
    if (otp.toLocaleString().length < 6)
      return res.status(400).json(new ApiError("opt must be 6 digit long"));
    const data = await otpService.verifyOtp(email, otp);
    if (!data.isVerified)
      return res.status(401).json(new ApiError("invalid otp"));
    return res.status(200).json({ message: "success", token: data.token });
  } catch (err) {
    logger.error(err);
    return res.status(500).json(new ApiError("internal server error"));
  }
};
export {
  loginController,
  registerController,
  otpsendController,
  otpVerifyController,
};
