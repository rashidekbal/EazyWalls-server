import "dotenv/config";
import app from "./app.js";
import connectDb from "./db/connection.js";
const port:string|undefined=process.env.PORT;
const mongoUrl:string|undefined=process.env.MONGO_URL;
app.listen(port?port:8000,(err):void=>{
    if(err){
        console.log("error starting server : "+err);
        return ;
    }
        console.log(`server running at port ${port}`);
        connectDb(mongoUrl?mongoUrl:"").then(()=>{
            console.log("conneted to mongo");
        }).catch((err)=>{
            console.log("error connecting to db: ",err)
        });
    
})
