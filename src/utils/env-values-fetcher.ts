import "dotenv/config"
const getEazyOtp_ApiKey=()=>{
    return process.env.EAZY_OTP_API_KEY as string;
}
const getJwtSecret=()=>{
    return process.env.JWT_SECRET as string;
}
export {getEazyOtp_ApiKey,getJwtSecret}