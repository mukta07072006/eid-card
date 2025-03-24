const express = require('express');
   const { GoogleSpreadsheet } = require('google-spreadsheet');
   const app = express();
   const PORT = 3000;

   // Middleware to parse JSON and form data
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));

   // Serve static files
   app.use(express.static('public'));

   // Set up EJS as the view engine
   app.set('view engine', 'ejs');
   app.set('views', './views');

   // Google Sheets setup
     const CREDENTIALS = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS);
     const SHEET_ID = process.env.1h3_UWha-K_kJzsrBIsrGHIwJ-Md4WEVaZnbFE37n5Dk;
    // Download from Google Cloud Console

   // Route to handle form submission
   app.post('/submit', async (req, res) => {
       const { name, accountNumber } = req.body;

       try {
           // Load the Google Sheet
           const doc = new GoogleSpreadsheet(SHEET_ID);
           await doc.useServiceAccountAuth(CREDENTIALS);
           await doc.loadInfo();

           // Get the first sheet
           const sheet = doc.sheetsByIndex[0];

           // Add a new row with the submission data
           await sheet.addRow({
               Timestamp: new Date().toLocaleString(),
               Name: name,
               'Account Number': accountNumber,
           });

           res.status(200).send('Submission successful!');
       } catch (error) {
           console.error('Error submitting data:', error);
           res.status(500).send('Submission failed. Please try again.');
       }
   });

   // Homepage route
   app.get('/', (req, res) => {
       res.render('index');
   });

   // Card page route
   app.get('/:name', (req, res) => {
       const name = req.params.name;
       const imagePath = `/images/${name}.jpg`;
       res.render('card', { name, imagePath });
   });

   // Start the server
   app.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
   });
