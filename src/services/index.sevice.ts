import UserRepo from "../repository/users.js";
import AuthService from "./AuthService.js";
import OtpService from "./otpService.js";
import UserService from "./UserService.js";

const authService:AuthService=new AuthService(new UserRepo());
const otpService=new OtpService();
const userService=new UserService(new UserRepo());

export {
    authService,
    otpService,
    userService
}