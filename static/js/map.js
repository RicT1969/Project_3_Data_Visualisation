// Define a function to calculate the marker radius based on magnitude
function getMarkerRadius(magnitude) {
  // Adjust the scaling factor as needed
  const scalingFactor = 4;
  // Calculate the radius using a simple linear scaling function
  return Math.sqrt(magnitude) * scalingFactor;
}

// Define a function to determine the color based on MMI
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
const map = L.map('map').setView([-41.2865, 174.7762], 10);

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
          Date: ${date}<br>
          MMI: ${mmi}<br>
          Magnitude: ${magnitude}<br>
          Depth: ${depth}
        `);
      });
    } else {
      console.error('Error: Invalid data format. Expected an array.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Manual earthquake data
const manualData = [
  {
    "date": "2023-06-17 00:00:00",
    "depth": 22.44568825,
    "index": 0,
    "latitude": -42.02975845,
    "locality": "40 km north of Kaikoura",
    "longitude": 173.735199,
    "magnitude": 1.780997494,
    "mmi": -1,
    "publicID": "2023p452421",
    "time": "2023-06-17 09:30:18.746000+00:00"
  },
  {
    "date": "2023-06-17 00:00:00",
    "depth": 26.99663353,
    "index": 1,
    "latitude": -40.40055466,
    "locality": "20 km east of Palmerston North",
    "longitude": 175.8822479,
    "magnitude": 3.021375756,
    "mmi": 3,
    "publicID": "2023p452386",
    "time": "2023-06-17 09:11:40.087000+00:00"
  },
  {
    "date": "2023-06-17 00:00:00",
    "depth": 24.72915649,
    "index": 2,
    "latitude": -40.39117813,
    "locality": "20 km east of Palmerston North",
    "longitude": 175.8869019,
    "magnitude": 2.93598542,
    "mmi": 3,
    "publicID": "2023p452375",
    "time": "2023-06-17 09:05:50.271000+00:00"
  },
  {
    "date": "2023-06-17 00:00:00",
    "depth": 24.88100243,
    "index": 3,
    "latitude": -39.65148926,
    "locality": "35 km east of Taihape",
    "longitude": 176.2091217,
    "magnitude": 0.386625535,
    "mmi": -1,
    "publicID": "2023p452356",
    "time": "2023-06-17 08:55:28.053000+00:00"
  },
  {
    "date": "2023-06-17 00:00:00",
    "depth": 28.45860291,
    "index": 4,
    "latitude": -39.22940063,
    "locality": "45 km east of Stratford",
    "longitude": 174.8218079,
    "magnitude": 2.143574257,
    "mmi": -1,
    "publicID": "2023p452338",
    "time": "2023-06-17 08:45:50.111000+00:00"
  },
  {
    "date": "2023-06-17 00:00:00",
    "depth": 12.8352375,
    "index": 5,
    "latitude": -42.44569778,
    "locality": "5 km south-east of Kaikoura",
    "longitude": 173.7214508,
    "magnitude": 2.085746448,
    "mmi": 3,
    "publicID": "2023p452303",
    "time": "2023-06-17 08:27:23.995000+00:00"
  },
  {
    "date": "2023-06-17 00:00:00",
    "depth": 16.82185936,
    "index": 6,
    "latitude": -40.4851799,
    "locality": "10 km north-east of Pongaroa",
    "longitude": 176.2889252,
    "magnitude": 1.542165435,
    "mmi": -1,
    "publicID": "2023p452270",
    "time": "2023-06-17 08:09:56.145000+00:00"
  }
];

// Loop through the manual data
manualData.forEach(earthquake => {
  // Extract latitude, longitude, depth, magnitude, MMI, and locality from each earthquake
  const { latitude, longitude, depth, magnitude, mmi, locality, date } = earthquake;

  // Calculate circle radius based on magnitude using the getMarkerRadius function
  const radius = getMarkerRadius(magnitude);

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
    Date: ${date}<br>
    MMI: ${mmi}<br>
    Magnitude: ${magnitude}<br>
    Depth: ${depth}
  `);
});
