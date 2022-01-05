// Perform an API call to retrieve earthquake data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);

// Create array of markers to use when creating the map
function createMarkers(response) {
    console.log("create markers function in running");
    
    // Initialize an array to hold the earthquake markers
    quakeMarkers = [];

    // Function to set the marker color
    function markerColor(depth) {
        if (depth >= -10 && depth < 10) {
            return "#bfff80";
        } else if (depth >= 10 && depth < 30) {
            return "#ffff80";
        } else if (depth >= 30 && depth < 50) {
            return "#ffcc99";
        } else if (depth >= 50 && depth < 70) {
            return "#ff9933";
        } else if (depth >= 70 && depth < 90) {
            return "#e65c00";
        } else if (depth >= 90) {
            return "#cc2900";
        } 
    };

    // Loop through each earthquake and store the latitudes, longitudes, depths and magnitudes in markers
    let earthquakes = response.features;
    earthquakes.forEach(earthquake => {
        let coordinates = earthquake.geometry.coordinates;
        let lon = coordinates[0];
        let lat = coordinates[1];
        let depth = coordinates[2];
        let size = earthquake.properties.mag;

        quakeMarker = L.circleMarker([lat, lon], {
            color: "black",
            weight: 1,
            fillColor: markerColor(depth),
            fillOpacity: .5,
            radius: size * 4
        });
        console.log(markerColor(depth))
        quakeMarkers.push(quakeMarker);
    });

    // Create the map using markers array as a layer group
    createMap(L.layerGroup(quakeMarkers));
}

// Create the map
function createMap(earthquakes) {
    // Base layer
    let lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
    });

    // Map with base layer and earthquake marker layer
    let map = L.map("map", {
        center: [42.81, -107.09],
        zoom: 5,
        layers: [lightMap, earthquakes]
    });
}