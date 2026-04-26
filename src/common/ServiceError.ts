import serviceErrorType from "./ErrorEnum.js";

export default class serviceError extends Error{
    errorType:serviceErrorType;
    constructor(type:serviceErrorType,message:string){
        super(message);
        this.errorType=type;
    }

}