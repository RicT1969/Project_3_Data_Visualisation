let manualData =[{"date":"2023-06-17 00:00:00","depth":22.44568825,"index":0,"latitude":-42.02975845,"locality":"40 km north of Kaikoura","longitude":173.735199,"magnitude":1.780997494,"mmi":-1,"publicID":"2023p452421","time":"2023-06-17 09:30:18.746000+00:00"},{"date":"2023-06-17 00:00:00","depth":26.99663353,"index":1,"latitude":-40.40055466,"locality":"20 km east of Palmerston North","longitude":175.8822479,"magnitude":3.021375756,"mmi":3,"publicID":"2023p452386","time":"2023-06-17 09:11:40.087000+00:00"},{"date":"2023-06-17 00:00:00","depth":24.72915649,"index":2,"latitude":-40.39117813,"locality":"20 km east of Palmerston North","longitude":175.8869019,"magnitude":2.93598542,"mmi":3,"publicID":"2023p452375","time":"2023-06-17 09:05:50.271000+00:00"}]

app.get("/api/api/report/dropdown", function (req, res) {
  const url = 'https://jsonplaceholder.typicode.com/todos';
  // Make a request
    axios.get(url)
      .then(response => {
        // send the collected data back to the client-side DataTable
        res.json({
          "data": response.data
        })
      })
      .catch(function (error) {
         // handle error
         res.json({"error": error});
      })
  });