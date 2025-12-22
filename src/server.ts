import "dotenv/config";
import app from "./app.js";
const port:string|undefined=process.env.PORT;
app.listen(port?port:8000,(err):void=>{
    if(err){
        console.log("error starting server : "+err);
        return ;
    }
        console.log(`server running at port ${port}`);
    
})
