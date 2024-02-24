const multer = require('multer');
const { Predict} = require("../controllers/Predict");
const { Extract} = require("../controllers/extract");
const router=require('express').Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/predict", Predict);
router.post("/extract",  upload.single('pdf'), Extract);




module.exports = router;