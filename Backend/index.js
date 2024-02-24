const express = require("express");
const mongoose = require("mongoose");
const dotenv=require('dotenv');
const route = require("./routes/routes.js");
dotenv.config()

const { URI, PORT } = process.env;


const app = express()



app.use(express.json());  //to get json datas from client 

 //to apply cors 
// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );  



//connecting to mongodb database
mongoose.connect(URI, {

})
  .then(()=>{
    console.log("db connected");
    })
  .catch((err)=>{
    console.log(err);
    })



app.use("/", route);

app.listen(PORT,'0.0.0.0', ()=>{
    console.log(`server running at ${PORT}`);
});


