// Helper function to format the date as "dd/mm/yyyy"
function formatDate(date) {
  const parsedDate = new Date(date);
  const day = parsedDate.getDate();
  const month = parsedDate.getMonth() + 1;
  const year = parsedDate.getFullYear();
  return `${day}/${month}/${year}`;
}

// Helper function to format decimal numbers with specified decimal places
function formatDecimal(number, decimalPlaces) {
  const factor = 10 ** decimalPlaces;
  const roundedNumber = Math.round(number * factor) / factor;
  return roundedNumber.toFixed(decimalPlaces);
}


// Fetch earthquake data from the database
function updateTable() {
  // Calculate the start date as the current date minus 100 days
  const today = new Date();
  const startDate = new Date(today.getTime() - (360 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

  // Set the end date as the current date
  const endDate = today.toISOString().split('T')[0];

  const url = `/api/data?start=${startDate}&end=${endDate}`; // Replace with your API endpoint for filtered data

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Get the table body element
      const tbody = document.querySelector('#earthquakeTable tbody');

      // Clear any existing rows
      tbody.innerHTML = '';

      // Check if the data is an array
      if (Array.isArray(data)) {
        // Limit the data to 10 rows
        const limitedData = data.slice(0, 10);

        limitedData.forEach(earthquake => {
          const { date, locality, mmi, magnitude, depth } = earthquake;

          // Create a new row
          const row = document.createElement('tr');

          // Create cells for each data field
          const dateCell = document.createElement('td');
          const formattedDate = formatDate(date);
          dateCell.textContent = formattedDate;
          row.appendChild(dateCell);

          const localityCell = document.createElement('td');
          localityCell.textContent = locality;
          row.appendChild(localityCell);

          const mmiCell = document.createElement('td');
          mmiCell.textContent = mmi;
          row.appendChild(mmiCell);

          const magnitudeCell = document.createElement('td');
          const formattedMagnitude = formatDecimal(magnitude, 2);
          magnitudeCell.textContent = formattedMagnitude;
          row.appendChild(magnitudeCell);

          const depthCell = document.createElement('td');
          const formattedDepth = formatDecimal(depth, 2);
          depthCell.textContent = formattedDepth;
          row.appendChild(depthCell);

          tbody.appendChild(row);
        });
      } else {
        console.error('Error: Invalid data format. Expected an array.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

