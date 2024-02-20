const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/routes.js");

// const { URI, PORT } = process.env;


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
mongoose.connect("mongodb+srv://fasil:fasil786313@cluster0.yyhfm82.mongodb.net/crop_recomondation", {

})
  .then(()=>{
    console.log("db connected");
    })
  .catch((err)=>{
    console.log(err);
    })

    const newCrop=new mongoose.Schema(
      {
        Crop: String,
        WaterRequirement: String,
        TotalInvestmentPerAcre: String,
        SecondBestCrop: String,
        ThirdBestCrop: String,
        DurationOfCultivation: String,
        SoilHealthImprovementSuggestions: String,
        MarketAnalysis: String
      }      
    )

    const crop = mongoose.model("crop", newCrop);

app.get("/allcrops", async(req,res)=>{
  try {
    const cropdetail = await crop.find()
    res.json(cropdetail)
  } catch (error) {
    console.error(error)
    res.status(500).json({error:"error"})
  }

    
})


app.use("/", route);

app.listen(4000, ()=>{
    console.log(`server running at 4000`);
});


