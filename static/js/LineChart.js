// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', () => {
    const lineChartCanvas = document.getElementById('lineChartCanvas');
    let myChart; // Declare the chart variable
    let originalData; // Store the original data for reference
  
    // Fetch data from Flask endpoint
    fetch('/api/data')
      .then(response => response.json())
      .then(data => {
        // Store the original data
        originalData = data;
  
        // Extract labels and values from the data
        const labels = data.map(row => row.locality);
        const values = data.map(row => row.magnitude);
  
        // Create the line chart and assign it to the chart variable
        myChart = new Chart(lineChartCanvas, {
          type: 'line', // Change to line chart
          data: {
            labels: labels,
            datasets: [{
              label: 'Line Chart', // Update label
              data: values,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
  
        console.log(data);
  
        // Event listener for button click
        document.getElementById('filterButton').addEventListener('click', updateChart);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  
    function updateChart() {
      const dateFrom = document.getElementById('startDate').value;
      const dateTo = document.getElementById('endDate').value;
  
      // Filter the data based on the selected date range
      const filteredData = originalData.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= new Date(dateFrom) && entryDate <= new Date(dateTo);
      });
  
      // Extract labels and values from the filtered data
      const labels = filteredData.map(row => row.locality);
      const values = filteredData.map(row => row.magnitude);
  
      // Update the chart labels and data
      myChart.data.labels = labels;
      myChart.data.datasets[0].data = values;
      myChart.update();
    }
  });
  