// Define a function to calculate the marker radius based on magnitude
function getMarkerRadius(magnitude) {
  // Adjust the scaling factor as needed
  const scalingFactor = 4;
  // Calculate the radius using a simple linear scaling function
  return Math.sqrt(magnitude) * scalingFactor;
}

// Define a function to determine the color based on MMI
function getColor(mmi) {
  if (mmi >= 6) {
    return 'darkred';
  } else if (mmi >= 5) {
    return 'orange';
  } else if (mmi >= 2 && mmi <= 4) {
    return '#ffff99'; // Pale yellow color
  } else if (mmi <= 1) {
    return 'darkgreen';
  }
}

// Create a map instance and set its view to New Zealand
const map = L.map('map').setView([-41.2865, 173.2444], 6);

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
      // Loop through the earthquake data
      data.forEach(earthquake => {
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
          color: 'black', // Set the outline color to match the fill color
          weight: 1,
          opacity: 1,
          fillOpacity: 0.75
        }).addTo(map);

        // Add a popup to the marker displaying the earthquake's details
        marker.bindPopup(`
          <h3>${locality}</h3>
          Date: ${formattedDate}<br>
          MMI: ${mmi}<br>
          Magnitude: ${formattedMagnitude}<br>
          Depth: ${formattedDepth}
        `);

        // Show the popup when hovering over the marker
        marker.on('mouseover', function (e) {
          this.openPopup();
        });

        // Hide the popup when moving the mouse out of the marker
        marker.on('mouseout', function (e) {
          this.closePopup();
        });

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
