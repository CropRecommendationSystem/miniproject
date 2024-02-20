const { spawn } = require('child_process');
const Crop = require('../Models/crop.js');

module.exports.Predict = async (req, res, next) => {
    const inputData = req.body;
    
    console.log(inputData);

    // Serialize input data to JSON string
    const inputDataJson = JSON.stringify(inputData);

    // Spawn a Python process
    const pythonProcess = spawn('python', ['C:/Users/DELL/Desktop/mini project/miniproject/Backend/test.py']);

    // Send input data to the Python script via stdin
    pythonProcess.stdin.write(inputDataJson);
    pythonProcess.stdin.end(); // Close the stdin stream

    let outputData = '';

    // Capture output from Python script
    pythonProcess.stdout.on('data', (data) => {
        outputData += data.toString();
        console.log("express", outputData);
    });

    // Handle Python script exit
    pythonProcess.on('close', async (code) => {
        if (code !== 0) {
            return res.status(500).send('Python script encountered an error.');
        }
        try {
            // Parse the output data to get the predicted crop name
            const predictionData = JSON.parse(outputData);
            const cropName = predictionData.prediction;
            
            // console.log(predictionData);
            console.log(cropName);

            // Retrieve crop details from the database
            const cropDetails = await getCropDetailsByName(cropName);

            // Send predictions back to the client along with crop details
            res.json({ prediction: cropName, cropDetails });
        } catch (error) {
            res.status(500).json({ message: "Error processing crop details " });
        }
    });

    // Function to retrieve crop details by name from the database
    async function getCropDetailsByName(cropName) {
        try {
            const cropDetails = await Crop.findOne({ Crop: cropName });
            if (!cropDetails) {
                throw new Error("Crop details not found");
            }
            return cropDetails;
        } catch (error) {
            throw new Error("Error fetching crop details");
        }
    }
};
