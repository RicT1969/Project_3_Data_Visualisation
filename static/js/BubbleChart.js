// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('bubbleChartCanvas');
  let myChart; // Declare the chart variable
  let originalData; // Store the original data for reference

  // Fetch data from Flask endpoint
  fetch('/api/data')
    .then(response => response.json())
    .then(data => {
      // Store the original data
      originalData = data;

      // Extract the necessary data for the bubble chart
      const labels = data.map(row => row.locality);
      const magnitudes = data.map(row => row.magnitude);

      // Create the bubble chart
      const ctx = canvas.getContext('2d');
      myChart = new Chart(ctx, {
        type: 'bubble',
        data: {
          datasets: [
            {
              label: 'Earthquakes',
              data: magnitudes.map((magnitude, index) => ({
                x: index, // X-axis value (you can change this according to your needs)
                y: magnitude, // Y-axis value (magnitude)
                r: magnitude, // Bubble size based on magnitude
              })),
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: false, // Hide the X-axis labels if needed
            },
            y: {
              title: {
                display: true,
                text: 'Magnitude',
              },
            },
          },
        },
      });

      // Event listener for dropdown change
      document.getElementById('magnitudeDropdown').addEventListener('change', updateChart);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

  function updateChart() {
    const selectedMagnitude = document.getElementById('magnitudeDropdown').value;

    // Filter the data based on the selected magnitude
    const filteredData = originalData.filter(entry => entry.magnitude === selectedMagnitude);

    // Extract the necessary data for the bubble chart
    const labels = filteredData.map(row => row.locality);
    const magnitudes = filteredData.map(row => row.magnitude);

    // Update the chart data
    myChart.data.datasets[0].data = magnitudes.map((magnitude, index) => ({
      x: index, // X-axis value
      y: magnitude, // Y-axis value (magnitude)
      r: magnitude, // Bubble size based on magnitude
    }));
    myChart.update();
  }
});
