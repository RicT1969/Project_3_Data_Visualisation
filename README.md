# Project-3-Visualisation-Group-1
### Group 1 Team Members: 
•	Barsha Basel  
•	Hiew N Doan (Vincent)  
•	Micah Raquena-Pequeno  
•	Richard Thornton  
•	Roberto Sammassimo
# New Zealand Earthquake Visualisation

An interactive web-based map to visualize earthquake data in New Zealand collected by the GeoNet, highlighting the risk between occurence.

## Background
An application has been developed with the purpose of visualizing earthquake data from the past 365 days in New Zealand. The data utilized for this application is sourced from Geonet, an initiative established in 2001 to construct and operate a contemporary geological hazard monitoring system in New Zealand. Geonet effectively tracks and records approximately 20,000 earthquakes annually within and surrounding the nation, of which the majority are of small magnitude, while approximately 250 events are significant enough to be perceptible.   
To access earthquake statistics for the New Zealand region based on observations since 1960, the Earthquake Statistics page is available, while the GeoNet Quake Statistics page provides information on earthquake occurrences within the past year.   

The primary objective behind developing this application is to provide a straightforward and expeditious visualization of recent seismic activity in various locations, thereby facilitating public comprehension of the associated risks and frequency of such events. Our target audience of this application were individuals with little knowledge of New Zealand or earthquake data - such as first time travellers or digital nomads. We aimed to limit data shown per tab so that users could navigate intuitively without being overwhelmed by data they had little experience with.


## Features

- Leaflet-based interactive map.
- Visualization of earthquake data.
- Graphing a bar chart displays Quakes by Magnitude and locality.
- Summary table adjusted by map context.

## Data Sources

- Earthquake data: [GeoNet](https://www.geonet.org.nz/earthquake/statistics)
- GeoNet API url: https://api.geonet.org.nz/


## Installation

1. Clone the repository to local and save as <nz_quake_project>
2. Create virtual environment : using git command:  mkdir <nz_quake_env>
3. Activate virtual environment and move to repositoty directory using git command: conda activate nz_quake_env ; cd <nz_quake_project>
4. Install Flask using command: pip install flask
5. Run flask app using command: flask run . We recommend to copy host address and open using google chrome.    
  
## Create Database from GeoNet API URL

In order to create the database from scratch start with file under the following:
- data> create_database> 1.1 quake_mmi_fetch.ipynb: run code to create csv from source API  .
- data> create_database> 1.2 quake_mmi_sqlite_fetch.ipynb: run code to create squlite db table using csv.

## Usage and App Demo Images  

Explore the interactive map to see the earthquake data visualized with markers representing Earthquake details (start date, end date and MMI Filter).   
Click on 'Apply filter' to get more information about the earthquakes regarding the dates filled.  
Refer to folder "app images" for images of the application in the chrome browser.   

## Built With

- JavaScript (including Chart.js as additional library,)
- Leaflet.js
- Jupiter Notebook
- HTML
- CSS
- Python (using Flask and SQLAlchemy)
- SQLite

<p><h2>Technical notes</h2></p>

<p><h3>API and data cleaning using Pandas</h3></p>

<p>Python used to retrieve earthquake data from different APIs based on different MMI levels, process the JSON data, and perform data cleaning and transformation to create a final DataFrame named "quake_mmi_df" containing cleaned earthquake data with relevant columns. Libraries and modules used include: libraries and modules, including pandas, urlopen from urllib.request, numpy, os, and csv.</p>

<p>In summary:</p><ul>
  
<li>Owing to limits on the amount of data pulled in one call, multiple URLs were defined for different levels of MMI (Modified Mercalli Intensity).</li>

<li>Once called and stored, the JSON data normalised using pd.json_normalize to create separate DataFrames for each MMI level (MMI2_df, MMI3_df, MMI4_df, MMI5_df, MMI6_df, MMI7_df).</li>

<li>The separate DataFrames concatenated into a single DataFrame named "MMI_union_df" using pd.concat.</li
                                                                                                        
<li>The columns in MMI_union are renamed using amapping directory, and a new "date" column created in "MMI_union_df" by extracting the date from the "time" column and formatting it as '%Y-%m-%d' using pd.to_datetime and dt.strftime.</li>

<li>The desired columns from "MMI_union_df" are selected to create a new DataFrame named "MMI_new_clean_df." From this a final DataFrame is created called "quake_mmi_df". Additional operations performed: resetting the index and dropping duplicates.</li></ul>

<p><h3>Flask Application</h3></p>

<p>Python code is used to build a Flask application that serves as a web server for earthquake data visualization.</p>
<p>In summary:</p><ul>
  
<li><b>Libraries and Imports</b></li><ul>  
Libraries and modules imported, including Flask, SQLAlchemy, SQLite3 and Pickle along with other dependencies.</li></ul>

<li><b>Database Setup</b></li><ul>  
<li>Code creates an engine to connect to an SQLite database named "quake_mmi_data.db". The database connection is established.</li></ul>

<li><b>Flask Routes</b></li><ul>  
<li>The Flask application is created with several routes defined for different HTML templates. These routes handle requests for the main page, bar chart page, map tab page, and line chart page. The corresponding HTML templates are rendered and returned to the client.</li></ul>

<li><b>API Routes</b></li><ul>  
<li>API routes are defined to retrieve earthquake data from the database. The "/api/data" route fetches all the data from the "quake_mmi_test" table in the database and returns it as JSON. The "/api/report/dropdown" route retrieves aggregated report data based on a specified publicID parameter, or a default publicID if not provided.</li></ul>

<li><b>Running the Application</b></li><ul>
<li>The application is run when the script is executed directly (not imported as a module). The application runs in debug mode, which provides detailed error messages for debugging purposes.</li></ul></ul>

<p><h3>Interactive Map</h3></p>
<p>JavaScript code creates an interactive map displaying earthquake data by location. The map is buiit using the Leaflet library and retrieves earthquake data from a Flask backend API.</p>
<p>In summary:<p><ul>

<li><b>Marker Radius Calculation:</b></li><ul>
<li>getMarkerRadius function calculates marker radius based on the magnitude of the earthquake. It uses a linear scaling function, adjusting the scaling factor as needed.</li></ul>

<li><b>Color Determination</b></li><ul>
<li>The getColor function determines the color of the marker based on the MMI (Modified Mercalli Intensity) of the earthquake. It assigns different colors based on thresholds.</li></ul>

<li><b>Map Initialization</b></li>
A map instance created using Leaflet and set to view New Zealand. The map is displayed on an HTML element with the ID "map" and the tile layer is sourced from OpenStreetMap.</li>
<li><b>Fetching Earthquake Data</b></li><ul>
<li>The earthquake data is fetched from the backend API endpoint "/api/data" and the response converted to JSON format.</li></ul>

<li><b>Data Processing and Marker Creation</b></li><ul>
  
<li>Earthquake data is processed in a series of steps. Each earthquake's latitude, longitude, depth, magnitude, MMI, locality and date are extracted. The marker's radius is calculated using the getMarkerRadius function.</li></ul>

<li><b>Popup and Event Handling</b></li><ul>
  
<li>Popup added to each marker, displaying the earthquake's metadats (locality, date, MMI, magnitude, and depth). Event listeners show and hide the popup when hovering over or moving the mouse out of the marker.</li></ul>

<li><b>Error Handling</b></li><ul>
<li>Error handling implemented to catch errors during the data fetching and processing stages.</li></ul></ul>

<p><h3>Bar Chart</h3></p>

<p>JavaScript code creates a bar chart using Chart.js library and fetching data from the Flask backend API. The chart is designed to display earthquake magnitude data over time.</p><p> In summary:</p><ul>

<li><b>Chart Initialization</b></li><ul>
The code waits for the DOM content to load before executing ensuring that the necessary HTML elements are available for manipulation. Variables are initialised for the chart canvas element (barChartCanvas), the chart instance (myChart) and the original data (originalData).</li></ul>
<li><b>Data Fetching</b></li><ul><li>
Data is fetched from the backend API endpoint "/api/data" and converted to JSON format.</li></ul>
<li><b>Data Processing and Chart Creation</b></li><ul><li>
The original data is stored for reference. Labels and values are extracted from the data, representing the locality and magnitude of earthquakes. A bar chart is created using the Chart.js library, and assigned to the myChart variable. The chart is configured with labels, datasets, and styling options.</li></ul>
<li><b>Event Handling</b></li><ul><li>
An event listener is set on a button element with the ID "filterButton". When the button is clicked, the updateChart function is called.</li></ul>
<li><b>Chart Updating</b></li><ul><li>
The updateChart function is responsible for updating the chart based on the selected date range. It retrieves the start and end dates from HTML input elements. The original data is filtered based on the selected date range, resulting in the filteredData array. Labels and values are extracted from the filtered data. The chart's labels and data are updated accordingly using the myChart instance, and the chart is visually updated using the update method.</li></ul>
<li><b>Error Handling</b></li><ul><li>
<li>Error handling is implemented as described above for the map</li></ul></ul>

<p><h3>Line Chart</h3></p>

<p>JavaScript code fetches data from a Flask API endpoint and creates a line chart using the Chart.js library. The chart is displayed on an HTML canvas element with the ID "lineChartCanvas". The code also includes functionality to update the chart based on a selected date range.</p></p><p> In summary:</p>

<p><h3>Initialisation</h3></p><ul>
<li>The code waits for the DOM content to load before executing the main functionality.</li>
<li>The lineChartCanvas element retrieved from DOM using its ID.</li>
<li>Variables myChart and originalData are declared to store the chart object and the original data fetched from the API, respectively.</li></ul>
<p><h3>Fetching Data</h3></p><ul>
<li>The code makes a GET request to the "/api/data" endpoint of the Flask API and the response is converted to JSON format.</li>
<li>The original data is stored in the originalData variable for later reference.</li></ul>
<p><h3>Chart Creation</h3></p><ul>
<li>Labels and values extracted from the fetched data using the map() method.</li>
<li>A new line chart is created using the Chart.js library and assigned to the myChart variable.</li>
<li>The chart's configuration includes the type as a line chart, labels, data, and visual customization options.</li></ul>
<p><h3>Updating the Chart</h3></p><ul>
<li>An event listener added to the "filterButton" element's click event.</li>
<li>When the button is clicked, the updateChart() function is called.</li>
<li>The updateChart() function retrieves the selected date range from input fields.</li>
<li>The original data is filtered based on the selected date range using the filter() method.</li>
<li>The labels and values are extracted from the filtered data.</li>
<li>The chart's labels and data are updated with the new values and the chart updated using the update() method.</li></ul>
<p><h3>Error Handling</h3></p><ul>
<li>As above.</li></ul></ul>

<p><h3>HTML Code</h3></p>
<p>The HTML code builds the webpage for the New Zealand Earthquake Dashboard, focusing on the structure and layout of the dashboard page.</p>
<p>In summary:</p><ul>
<li>The code uses the Bulma CSS framework and the Chart.js library.</li>
<li>References a custom CSS file for additional styling and the requisite JavaScript files for additional functionality.</li>
<li>The page structure consists of a header, navigation bar, and content sections:</li>
<li>The header contains the title of the dashboard.</li>
<li>The navigation bar includes links for "Map View," "Bar Chart," and "Line Chart."</li>
<li>For the map chart, The content is divided into two columns using the Bulma grid system.</li>
<li>The left column contains a card with the title "Locations" and a placeholder content for a map.
The right column contains a card with the title "Quakes by Magnitude and locality over time" and a placeholder content for a visualization.</li>
<li>Within the visualization card, there is a canvas element with the id "barChartCanvas" for rendering the bar chart. This relates to the second page.</li>
<li>Date input fields labeled "Start Date" and "End Date" are provided for data filtering and a 
A button with the id "filterButton" is available to apply the filter.</li></ul>


