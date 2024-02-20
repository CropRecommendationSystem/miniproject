
const { Predict} = require("../controllers/Predict");
const router=require('express').Router();

router.post("/predict", Predict);




module.exports = router;