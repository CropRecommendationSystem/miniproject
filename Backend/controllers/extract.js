const { spawn } = require('child_process');
const { Predict } = require('./Predict');




// Function to extract data from a PDF file
const extractDataFromPDF = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        
        //inputdata
        const inputdata = fileBuffer

        // Spawn a Python process and pass the file buffer as input
        const pythonProcess = spawn('python', ['controllers/tabelextractor.py']);
        let jsonData = '';

         // Pass file buffer to Python script via stdin
         pythonProcess.stdin.write(inputdata);
         pythonProcess.stdin.end();

         // Capture output from Python script
        pythonProcess.stdout.on('data', (data) => {
            jsonData += data.toString();
            console.log("express",jsonData);
        });

        // // Handle errors
        // pythonProcess.on('error', (error) => {
        //     reject(error);
        // });

        // Handle Python script termination
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                // Successfully extracted data
                resolve(JSON.parse(jsonData));
            } else {
                // Failed to extract data
                reject(new Error('Failed to extract data from PDF.'));
            }
        });

       

        
    });
};


module.exports.Extract = async (req, res, next) => {
    // Check if a file is uploaded
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }
    // console.log(req.file.buffer);

  // Extract data from the uploaded PDF file
    extractDataFromPDF(req.file.buffer)
        .then((data) => {
            // Send extracted data as JSON response
            res.json({ success: true, data });
            Predict(data)
        })
        .catch((error) => {
            // Send error message if extraction fails
            res.status(500).json({ success: false, message: error.message });
        });
};
