// Get the canvas element
const barChartCanvas = document.getElementById('barChart');

// Fetch data from Flask endpoint
fetch('/api/data')
  .then(response => response.json())
  .then(data => {
    // Extract labels and values from the data
    const labels = data.map(row => row.mmi);
    const values = data.map(row => row.depth);
    
    // Create the bar chart
    new Chart(barChartCanvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Bar Chart',
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
    console.log(data)
  });

