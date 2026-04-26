import FavouriteRepo from "../repository/favourite.repo.js";
import UserRepo from "../repository/users.js";
import AuthService from "./AuthService.js";
import OtpService from "./otpService.js";
import UserService from "./UserService.js";
import WallpaperService from "./wallpaperService.js";

const authService:AuthService=new AuthService(new UserRepo());
const otpService=new OtpService();
const userService=new UserService(new UserRepo());
const wallpaperService=new WallpaperService(new FavouriteRepo());

export {
    authService,
    otpService,
    userService,
    wallpaperService
}