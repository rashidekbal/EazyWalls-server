import "dotenv/config";
import app from "./app.js";
import connectDB from "./db/connection.js";
const port:string|undefined=process.env.PORT;
const production=process.env.PRODUCTION as string;
app.listen(port?port:8000,(err):void=>{
    if(err){
        console.log("error starting server : "+err);
        return ;
    }
    if(production==="false"){
 connectDB();
    }
    
        console.log(`server running at port ${port}`);
       
    
})
