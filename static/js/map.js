// Import Leaflet library
import L from 'leaflet';

// Create a map instance and set its view to New Zealand
const map = L.map('map').setView([-41.2865, 174.7762], 6);

// Add a tile layer to the map using OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);

// Fetch earthquake data from the database
fetch('/earthquake') // Flask Backend URL
  .then(response => response.json())
  .then(data => {
    // Loop through the earthquake data
    data.forEach(earthquake => {
      // Extract latitude, longitude, and magnitude from each earthquake
      const { latitude, longitude, magnitude } = earthquake;

      // Create a marker at the earthquake's location
      const marker = L.marker([latitude, longitude]).addTo(map);

      // Add a popup to the marker displaying the earthquake's magnitude
      marker.bindPopup(`Magnitude: ${magnitude}`);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
