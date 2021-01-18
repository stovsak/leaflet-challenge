// Create Marker Color Functions
function markerColor(mag) {

    if (mag <= 4.75) {
        return "#1635D9";
    } else if (4.75 < mag & mag <= 5.00) {
        return "#13DECE";
    } else if (5.00 < mag & mag <= 5.25) {
        return "#12E510";
    } else if (5.25 < mag & mag <= 5.50) {
        return "#DCEB0C";
    } else {
        return "#F02908";
    };
}

// Create the createMap function
function createMap(earthquakes) {

    // Create 2 tile layer options for the map
    var satelitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.satellite",
        accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API_KEY
    });
}