const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  
  Crop: {
    type: String,
    required: true
  },
  "Water Requirement": {
    type: String,
    required: true
  },
  "Total Investment per Acre": {
    type: String,
    required: true
  },
  "Second Best Crop": {
    type: String,
    required: true
  },
  "Third Best Crop": {
    type: String,
    required: true
  },
  "Duration of Cultivation": {
    type: String,
    required: true
  },
  "Soil Health Improvement Suggestions": {
    type: String,
    required: true
  },
  "Market Analysis": {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Crop", cropSchema);
