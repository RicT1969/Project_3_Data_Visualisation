// Fetch earthquake data from the database
fetch('/api/data') // Flask Backend URL
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Check if the data is an array
    if (Array.isArray(data)) {
      // Get the table body element
      const tableBody = document.querySelector('#earthquakeTable tbody');

      // Slice the data to display only 10 rows
      const slicedData = data.slice(0, 10);

      // Loop through the sliced earthquake data
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
    } else {
      console.error('Error: Invalid data format. Expected an array.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
