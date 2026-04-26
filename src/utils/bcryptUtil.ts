import bcrypt from "bcrypt"
const salt=12;

export async function hashPassword(password:string):Promise<string>{
    return bcrypt.hash(password,salt);
}
export async function verifyPassword(rawPassword:string,hashedPassword:string):Promise<boolean>{
   return bcrypt.compare(rawPassword,hashedPassword);
}