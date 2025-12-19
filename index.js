import express from "express"
import CORS from "cors";
import "dotenv/config";
const port=process.env.PORT;
const app =express();
app.use(express.json({limit:"16kb"}));
app.use(CORS({origin:"*"}));
app.get("/",(req,res)=>{
    res.send("<h1>welcome to the page</h1>");
})
app.listen(port,(err)=>{
    if(err){
        console.log("error starting server : "+err);
        return ;
    }
        console.log(`server running at port ${port}`);
    
})
