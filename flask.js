const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Create a database connection
const db = new sqlite3.Database('database.db');

// Route to serve the web page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Route to fetch data from the database
app.get('/earthquakes', (req, res) => {
  db.all('SELECT * FROM earthquakes', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



// For Index HTML File
// <!DOCTYPE html>
// <html>
// <head>
//   <title>Earthquake Data</title>
//   <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
//   <script src="map.js"></script>
// </head>
// <body>
//   <div id="map"></div>

//   <script>
//     // Fetch earthquake data from Express.js endpoint
//     axios.get('/earthquakes')
//       .then(response => {
//         const data = response.data;

//         // Use the data to populate your JavaScript application
//         // ... (your code here)
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   </script>
// </body>
// </html>
