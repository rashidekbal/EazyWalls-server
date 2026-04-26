import express, { NextFunction } from "express"
import ApiError from "../common/apiError.js";
import jwt, { JwtPayload } from "jsonwebtoken"
import { getJwtSecret } from "../utils/env-values-fetcher.js";
import logger from "../utils/pino.js";
const verifyToken=async (req:express.Request,res:express.Response,next:NextFunction)=>{
    try {
        const header=req.headers;
        const authorizationn=header["authorization"];
        if(!authorizationn)return res.status(401).json(new ApiError("no auth header found"));
        const token=authorizationn.split(" ")[1];
        if(!token)return res.status(401).json(new ApiError("no bearer token found in auth header"));
        const result= jwt.verify(token,getJwtSecret()) as JwtPayload;
        req.auth={email:result.email};
        next();
        
    } catch (error) {
        logger.error(error);
        return res.status(401).json(new ApiError("invalid auth token"));
        
    }

}
export default verifyToken;