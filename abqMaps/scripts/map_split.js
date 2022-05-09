"use strict"; // JS strict mode

window.onload = function () {
    // create map container, add basemap
    var map = L.map("map_slider_container", {
        center: [39.73, -104.99], //[35.08770657898809, -106.65591268675824]
        zoom: 11,
    }).setView([35.08770657898809, -106.65591268675824], 11);

    // define basemap here
    var basemapAttribution =
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

    var basemapURL =
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";

    var streets = L.tileLayer(basemapURL, {
        id: "mapbox/streets-v11",
        attribution: basemapAttribution,
        tileSize: 512,
        zoomOffset: -1,
        maxZoom: 18,
    }).addTo(map);

    //at http://leaflet-extras.github.io/leaflet-providers/preview/
    var usgs_topo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 20,
        attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
    }).addTo(map);

    // add split control to map here using split-map plugin
    L.control.splitMap(streets, usgs_topo).addTo(map);

    // add scale bar to map
    L.control.scale().addTo(map);

    // add ruler to map
    L.control.ruler().addTo(map);

    // add printing function to map here using easyPrint plugin
    var printer = L.easyPrint({
        tileLayer: streets,
        sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
        filename: 'abq_map_split',
        exportOnly: true,
        hideControlContainer: true
    }).addTo(map);
};