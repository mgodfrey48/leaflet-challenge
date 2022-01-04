// Create a map
function createMap(earthquakes) {

    let lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
    });

    let baseMap = {
        "Light Map": lightMap
    };

    let markerLayer = {
        "Earthquakes": earthquakes
    };

    let map = L.map("map", {
        center: [42.81, -107.09],
        zoom: 5,
        layers: [lightMap, earthquakes]
    });
}

// Perform an API call to retrieve earthquake data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);

// Add markers to the map
function createMarkers(response) {
    console.log("create markers function in running");
    
    // Initialize an array to hold the earthquake markers
    quakeMarkers = [];

    // Loop through each earthquake and store the latitudes, longitudes, depths and magnitudes in markers
    let earthquakes = response.features;
    earthquakes.forEach(earthquake => {
        let coordinates = earthquake.geometry.coordinates;
        let lon = coordinates[0];
        let lat = coordinates[1];
        let depth = coordinates[2];
        let size = earthquake.properties.mag;

        quakeMarker = L.circle([lat, lon], {
            color: "yellow",
            fillColor: "yellow",
            fillOpacity: depth,
            radius: size
        });

        quakeMarkers.push(quakeMarker);
    });

    createMap(L.layerGroup(quakeMarkers));
}

