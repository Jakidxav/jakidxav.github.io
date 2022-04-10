"use strict";

window.onload = function () {
    // unm lat/lon coords: 35.08448549033154, -106.61978120194598
    var map = L.map('map_container').setView([35.08448549033154, -106.61978120194598], 11);

    // define basemaps here
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
    });

    streets.addTo(map);

    // add a marker on the tile layer, then add text popup to marker
    var marker = L.marker([35.08448549033154, -106.61978120194598]).addTo(map);
    marker.bindPopup("University of New Mexico").openPopup();
};