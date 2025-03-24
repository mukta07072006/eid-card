  const express = require('express');
   const path = require('path');

   const app = express();
   const PORT = 3000;

   // Set up EJS as the view engine
   app.set('view engine', 'ejs');
   app.set('views', path.join(__dirname, 'views'));

   // Serve static files (images, CSS, etc.)
   app.use(express.static(path.join(__dirname, 'public')));

   // Homepage
   app.get('/', (req, res) => {
       res.render('index');
   });

   // Dynamic routes for each person
   app.get('/:name', (req, res) => {
       const name = req.params.name;
       const imagePath = `/images/${name}.jpg`; // Assumes image names match>
       res.render('card', { name, imagePath });
   });

   // Start the server
   app.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
   });
