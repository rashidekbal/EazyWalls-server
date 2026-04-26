import Express,{ NextFunction } from "express";
import { isValidEmail } from "../utils/Regex.js";
import ApiError from "../common/apiError.js";
import users from "../repository/users.js";
import { userService } from "../services/index.sevice.js";

export default async function checkUserExistance(req:Express.Request,res:Express.Response,next:NextFunction){
            try {
                const email=req.body.email;
                if(!email||!isValidEmail(email))return res.status(400).json(new ApiError("please provide a valid email"));
                let user=await userService.getUser(email);
                if(!user)return next();
                return res.status(409).json(new ApiError("user already exists"));
            } catch (error) {
                console.log(error);
                return res.status(500).json(new ApiError("something went wrong"));
                
            }


}