let allEarthquakeData = [];

// Fetch earthquake data from the database
fetch('/api/data')
  .then(response => response.json())
  .then(data => {
    allEarthquakeData = data;
    // Call the function to initialize the table with the default MMI filter
    updateTableByMMIFilter('');
  })
  .catch(error => {
    console.error('Error:', error);
  });

function updateTableByMMIFilter(filterValue) {
  // Clear the existing table data
  const tableBody = document.querySelector('#earthquakeTable tbody');
  tableBody.innerHTML = '';

  // Filter the earthquake data based on the MMI value
  const filteredData = allEarthquakeData.filter(earthquake => {
    if (filterValue === '') {
      return true; // Show all earthquakes if no filter value is selected
    } else if (filterValue === '1') {
      return earthquake.mmi === 1;
    } else if (filterValue === '2-3') {
      return earthquake.mmi >= 2 && earthquake.mmi <= 3;
    } else if (filterValue === '4-5') {
      return earthquake.mmi >= 4 && earthquake.mmi <= 5;
    } else if (filterValue === '6+') {
      return earthquake.mmi >= 6;
    }
  });

  // Display only the first 10 rows of the filtered data
  const slicedData = filteredData.slice(0, 10);

  // Loop through the sliced earthquake data and populate the table
  slicedData.forEach(earthquake => {
    // Extract latitude, longitude, depth, magnitude, MMI, and locality from each earthquake
    const { latitude, longitude, depth, magnitude, mmi, locality, date } = earthquake;

    // Format the magnitude and depth with two decimal places
    const formattedMagnitude = magnitude.toFixed(2);
    const formattedDepth = depth.toFixed(2);

    // Format the date as dd/mm/yyyy
    const formattedDate = new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    // Create a new row for the earthquake data
    const newRow = document.createElement('tr');

    // Create table cells for each data field
    const localityCell = document.createElement('td');
    localityCell.textContent = locality;
    newRow.appendChild(localityCell);

    const dateCell = document.createElement('td');
    dateCell.textContent = formattedDate;
    newRow.appendChild(dateCell);

    const mmiCell = document.createElement('td');
    mmiCell.textContent = mmi;
    newRow.appendChild(mmiCell);

    const magnitudeCell = document.createElement('td');
    magnitudeCell.textContent = formattedMagnitude;
    newRow.appendChild(magnitudeCell);

    const depthCell = document.createElement('td');
    depthCell.textContent = formattedDepth;
    newRow.appendChild(depthCell);

    // Append the row to the table body
    tableBody.appendChild(newRow);

    // Print the details to the console
    console.log('Earthquake Details:');
    console.log('Locality:', locality);
    console.log('Date:', formattedDate);
    console.log('MMI:', mmi);
    console.log('Magnitude:', formattedMagnitude);
    console.log('Depth:', formattedDepth);
    console.log('-----------------------------');
  });
}

const mmiFilter = document.getElementById('mmiFilter');
mmiFilter.addEventListener('change', () => {
  const selectedValue = mmiFilter.value;
  updateTableByMMIFilter(selectedValue);
});
