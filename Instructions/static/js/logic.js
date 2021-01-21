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
    var satelitemap = L.tileLayer("https://api.tiles.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        maxZoom: 18,
        id: "satellite-v9",
        accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        maxZoom: 18,
        id: "dark-v10",
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
        center: [37.773972, -122.431297],
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
            var range = `${m} - ${m+0.25}`;
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

function createMarkers(response) {

    var earthquakes = response.features;
    var earthquakeMarkers = []

    for (var index = 0; index < earthquakes.length; index++) {
        var earthquake = earthquakes[index];

        var marker = L.circleMarker([ earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0] ], {
            radius: earthquake.properties.mag * 2,
            fillColor: markerColor(earthquake.properties.mag),
            fillOpacity: 0.75,
            stroke: false
        }
        ).bindPopup("<h4>" + earthquake.properties.place + "</h4><hr><p>" + new Date (earthquake.properties.time) + "</p>" + "<p><b>Magnitude: " +  earthquake.properties.mag + "<b></p>");
    
        earthquakeMarkers.push(marker);
    }
    createMap(L.layerGroup(earthquakeMarkers));
}

// API call to USGS API
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson", createMarkers);