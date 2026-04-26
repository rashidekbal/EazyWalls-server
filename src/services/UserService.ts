import UserRepo from "../repository/users.js";

export default  class UserService{
    userRepo:UserRepo;
    constructor(repo:UserRepo){
        this.userRepo=repo;
    }
    getUser=(email:string)=>{
        return this.userRepo.getUser(email);

    }
}