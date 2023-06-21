// Get the canvas element
const barChartCanvas = document.getElementById('barChart');
let allData = []; // Store all earthquake data
// Fetch data from Flask endpoint
fetch('/api/data')
  .then(response => response.json())
  .then(data => {
    allData = data; // Store all data for filtering later
    // Extract labels and values from the data
    const labels = data.map(row => row.mmi);
    const values = data.map(row => row.depth);
    const dates = data.map(entry => entry.date);

    // Create the bar chart
    const chart = new chart(barChartCanvas, {
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
          x: {
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: {
                day: 'MMM DD, YYYY'
              }
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
    console.log(data)
  });

  // Event listener for button click
document.getElementById('filterButton').addEventListener('click', updateChart);

function updateChart() {
  const dateFrom = document.getElementById('startDate').value;
  const dateTo = document.getElementById('endDate').value;

  // Filter the data based on the selected date range
  const filteredData = allData.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= new Date(dateFrom) && entryDate <= new Date(dateTo);
  });

  // Update the chart labels and data
  const filteredLabels = filteredData.map(entry => entry.mmi);
  const filteredValues = filteredData.map(entry => entry.depth);

  chart.data.labels = filteredLabels;
  chart.data.datasets[0].data = filteredValues;
  chart.update();
}
