// Create a map
function createMap() {
    let map = L.map("map", {
        center: [44.81, -93.09],
        zoom: 4
    });

    L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
    }).addTo(map);
}

createMap();



// Perform an API call to retrieve earthquake data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson").then(createMarkers);

function createMarkers(response) {
    console.log("create markers function in running");
    
    // Store the earthquake latitudes, longitudes, and depths
    let earthquakes = response.features;
    console.log(earthquakes[0]);

    earthquakes.forEach(earthquake => {
        let coordinates = earthquake.geometry.coordinates;
        let lon = coordinates[0];
        let lat = coordinates[1];
        let depth = coordinates[2];
        console.log(`Lat: ${lat}, Lon: ${lon}, Depth: ${depth}`);
    });
}

// Add markers to the map