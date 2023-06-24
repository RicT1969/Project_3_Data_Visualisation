// Define a function to calculate the marker radius based on magnitude
function getMarkerRadius(magnitude) {
  // Adjust the scaling factor as needed
  const scalingFactor = 4;
  // Calculate the radius using a simple linear scaling function
  return Math.sqrt(magnitude) * scalingFactor;
}

// Define a function to determine the color based on mmi
function getColor(mmi) {
  if (mmi >= 7) {
    return '#ff0000'; // Red
  } else if (mmi >= 5) {
    return '#ff8800'; // Orange
  } else if (mmi >= 3) {
    return '#ffff00'; // Yellow
  } else if (mmi >= 1) {
    return '#00ff00'; // Green
  } else {
    return '#0000ff'; // Blue
  }
}

// Create a map instance and set its view to New Zealand
const map = L.map('map').setView([-41.2865, 174.7762], 5);

// Add a tile layer to the map using OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);

// Fetch earthquake data from the database
fetch('/api/data') // Flask Backend URL
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Check if the data is an array
    if (Array.isArray(data)) {
      // Filter earthquakes based on MMI and date range
      const filteredData = data.filter(earthquake => {
        const mmiFilter = document.getElementById('mmiFilter').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        return (
          (mmiFilter === 'all' || earthquake.mmi.toString() === mmiFilter) &&
          (!startDate || earthquake.date >= startDate) &&
          (!endDate || earthquake.date <= endDate)
        );
      });

      // Clear existing markers from the map
      map.eachLayer(layer => {
        if (layer instanceof L.CircleMarker) {
          map.removeLayer(layer);
        }
      });

      // Loop through the filtered earthquake data
      filteredData.forEach(earthquake => {
        // Extract latitude, longitude, depth, magnitude, MMI, and locality from each earthquake
        const { latitude, longitude, depth, magnitude, mmi, locality, date } = earthquake;

        // Calculate circle radius based on magnitude using the getMarkerRadius function
        const radius = getMarkerRadius(magnitude);

        // Format the magnitude and depth with two decimal places
        const formattedMagnitude = magnitude.toFixed(2);
        const formattedDepth = depth.toFixed(2);

        // Format the date as dd/mm/yyyy
        const formattedDate = new Date(date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });

        // Create a circle marker at the earthquake's location
        const marker = L.circleMarker([latitude, longitude], {
          radius: radius,
          fillColor: getColor(mmi),
          color: '#000',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        }).addTo(map);

        // Add a popup to the marker displaying the earthquake's details
        marker.bindPopup(`
          <h3>${locality}</h3>
          Date: ${formattedDate}<br>
          MMI: ${mmi}<br>
          Magnitude: ${formattedMagnitude}<br>
          Depth: ${formattedDepth}
        `);

        // Print the details to the console
        console.log('Earthquake Details:');
        console.log('Locality:', locality);
        console.log('Date:', formattedDate);
        console.log('MMI:', mmi);
        console.log('Magnitude:', formattedMagnitude);
        console.log('Depth:', formattedDepth);
        console.log('-----------------------------');
      });
    } else {
      console.error('Error: Invalid data format. Expected an array.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });