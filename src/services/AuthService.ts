import { UserInterface } from "../model/user.js";
import UserRepo from "../repository/users.js";
import { isValidEmail } from "../utils/Regex.js";
import Error from "../common/Error.js";
import { generateFromEmail } from "unique-username-generator";
import { hashPassword, verifyPassword } from "../utils/bcryptUtil.js";
import jwt from "jsonwebtoken";
import { getJwtSecret } from "../utils/env-values-fetcher.js";
import serviceError from "../common/ServiceError.js";
import serviceErrorType from "../common/ErrorEnum.js";
import { authResponse } from "../types/authResponse.js";
export default class AuthService {
  userRepo: UserRepo;
  constructor(repo: UserRepo) {
    this.userRepo = repo;
  }
  register = async (email: string, password: string) => {
    try {
      if (!isValidEmail(email)) throw new Error("invalid email");
      if ((password.length < 6))
        throw new Error("password must be 6 letters long");
      const username = generateFromEmail(email) as string;
      const hashedPassword = (await hashPassword(password)) as string;
      type userModel = Omit<UserInterface, "_id">;
      let user: userModel = {
        email,
        password: hashedPassword,
        username,
        profile: "null",
        profileCloudinaryPublicId: "null",
      };
      await this.userRepo.createUser(user);
      const token=jwt.sign({email},getJwtSecret());
      return {token,
        username,
        profile:user.profile
    }
    } catch (err) {
      throw err;
    }
  };
   login = async (email:string,password:string) => {
    try {
        if (!isValidEmail(email)) throw new Error("invalid email");
         if ((password.length < 6))
        throw new Error("password must be 6 letters long");
         let result=await this.userRepo.getUser(email);
        if(result==null)throw new serviceError(serviceErrorType.USER_NOT_FOUND,"user doesn't exist ");
         const isPasswordVerified=verifyPassword(await hashPassword(password),result.password as string);
         if(!isPasswordVerified)throw new serviceError(serviceErrorType.WRONG_PASSWORD,"provided password is wrong");
        const token=jwt.sign({email},getJwtSecret());
        const data:authResponse={
            token,
            username:result.username as string,
            profile:result.profile as string
        }
        return data



    } catch (error) {
        if(error instanceof serviceError){
        throw new serviceError(error.errorType,error.message);}
        throw new serviceError(serviceErrorType.INTERNAL_SERVICE_ERROR,"internal server error");
        
    }

   };
}
