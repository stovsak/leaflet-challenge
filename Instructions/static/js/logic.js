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

    // Create baseMaps to hold layers
    var baseMaps = {
        "Satelite Map": satelitemap,
        "Dark Map": darkmap
    };

    // Create the overlayMaps to hold earthquakes
    var overlayMaps = {
        "Earthquakes": earthquakes
    };

    // Create map for earthquakes and satelite layers
    var myMap = L.map("map", {
        center: [0,0],
        zoom: 2,
        layers: [satelitemap, earthquakes]
    });

    // Create and add the layer control for maps
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    // Create Legend
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = () => {
        var div = L.DomUtil.create('div', 'info legend');
        var magnitudes = [4.75, 5.0, 5.25, 5.75];

        magnitudes.forEach(m => {
            var range = `${m} - ${m+.25}`;
            if (m >= 5.75) {range = `${m}+`}
            var html = `<div class="legend-item">
                  <div style+"height: 25px; width: 25px; background-color:${markerColor(m)}"> </div>
                  <div class=legend-text>Magnitude:-<strong${range}</strong></div>
            </div>`
            div.innerHTML += html
        });
        return div;
    };
    legend.addTo(myMap);
}

// Create Marker function
