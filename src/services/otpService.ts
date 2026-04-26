import { verifyOtp as verify,sendOtp } from "eazyotp";
import { NAME_CONSTANTS } from "../common/enum.js";
import { getEazyOtp_ApiKey, getJwtSecret } from "../utils/env-values-fetcher.js";
import Error from "../common/Error.js";
import { isValidEmail } from "../utils/Regex.js";
import jwt, { JwtPayload } from "jsonwebtoken"


export default class OtpService{
    sendOtp=(email:string)=>{
        if(!isValidEmail(email))throw new Error("please provide a valid email")
        return sendOtp(email,String(NAME_CONSTANTS.EazyWalls),getEazyOtp_ApiKey());
    }
    verifyOtp=async(email:string,otp:number)=>{
      try{
        //validate email
        if(!isValidEmail(email))throw new Error("please provide a valid email")
        //validate otp
        if(isNaN(otp))throw new  Error("otp must be a number");
        if(otp.toLocaleString().length<6)throw new Error("otp must be 6 digits");
        //verify otp
        let isVerified= await verify(email,otp,getEazyOtp_ApiKey());

        if(!isVerified)return {isVerified,token:null};
        //generate token;
        const jwtToken= jwt.sign({isVerified,email},getJwtSecret());
        //return token
        return {isVerified,token:jwtToken};
      }
      catch(error){
        //throw if any error
        throw error;
      }

    }

}