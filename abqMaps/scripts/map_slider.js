"use strict"; // JS strict mode

window.onload = function () {
    // create map container, add basemap
    var map = L.map("map_slider_container", {
        center: [39.73, -104.99], //[35.08770657898809, -106.65591268675824]
        zoom: 11,
    }).setView([35.08770657898809, -106.65591268675824], 11); // 35.0877696809, -106.655960083

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

    // begin slider logic here
    // this array is for the census population data
    var abqPopulation = {
        "1990": "386,988",
        "2000": "448,607",
        "2010": "545,852",
        "2020": "564,559"
    }

    // this array is for the New Mexico MHI data
    var nmMHI = {
        "1990": "$40,230",
        "2000": "$43,949",
        "2010": "$42,186",
        "2020": "$51,243"
    }

    // this array is for the New Mexico MHI data
    var rioDischargeDates = {
        "1990": "1981-1990",
        "2000": "1991-2000",
        "2010": "2001-2010",
        "2020": "2011-2020"
    }

    var rioDischargeValues = {
        "1990": "1,145.04",
        "2000": "1,110.1",
        "2010": "885.65",
        "2020": "608.49"
    }

    // access slider and two table <td> tags that change with the slider
    var slider = document.getElementById("backgroundImageSlider");
    // year
    var yearDisplay = document.getElementById("yearDisplay");
    var yearDisplayValue = document.getElementById("yearDisplayValue");
    // population
    var popDisplay = document.getElementById("popDisplay");
    var popDisplayValue = document.getElementById("popDisplayValue");
    // median household income
    var mhiDisplay = document.getElementById("mhiDisplay");
    var mhiDisplayValue = document.getElementById("mhiDisplayValue");
    // rio grand discharge data
    var dischargeDisplay = document.getElementById("dischargeDisplay");
    var dischargeDisplayValue = document.getElementById("dischargeDisplayValue");

    // display the default slider (year) value alongside population
    yearDisplay.innerHTML = "Year";
    yearDisplayValue.innerHTML = "<b>" + slider.value + "</b>";

    popDisplay.innerHTML = "Population"
    popDisplayValue.innerHTML = "<b>" + abqPopulation[slider.value]  + "</b>";

    mhiDisplay.innerHTML = "New Mexico Median Household Income";
    mhiDisplayValue.innerHTML = "<b>" + nmMHI[slider.value]  + "</b>";

    dischargeDisplay.innerHTML = "Rio Grande Average Discharge (" +rioDischargeDates[slider.value] + ")";
    dischargeDisplayValue.innerHTML = "<b>" + rioDischargeValues[slider.value] + " ft<sup>3</sup>/s </b>";

    var imageUrl = `../media/ABQ_${slider.value}_GE.jpg`;
    var imageBounds = [
            [35.2833338, -106.2363219],
            [34.8873773, -107.0528981]
            // [35.22711145535215, -106.32774353027345], These are the values that were in originally before Luke changed it. Feel free to delete.
            // [34.94842790637081, -106.9841766357422]
        ];
    var imgOverlay = L.imageOverlay(imageUrl, imageBounds).addTo(map);

    // Update the current slider value (each time you drag the slider handle)
    // Note: right now, you have to change the value of BOTH dischargeDisplay and dischargeDisplayValue
    slider.oninput = function () {
        // change map background image
        var imageUrl = `../media/ABQ_${this.value}_GE.jpg`;
        var imgOverlay = L.imageOverlay(imageUrl, imageBounds).addTo(map);

        // change table elements display
        yearDisplayValue.innerHTML = "<b>" + this.value  + "</b>";
        popDisplayValue.innerHTML = "<b>" + abqPopulation[this.value]  + "</b>";
        mhiDisplayValue.innerHTML = "<b>" + nmMHI[this.value] + "</b>";
        dischargeDisplay.innerHTML = "Rio Grande Average Discharge (" +rioDischargeDates[this.value] + ")";
        dischargeDisplayValue.innerHTML = " <b>" + rioDischargeValues[this.value] + " ft<sup>3</sup>/s </b>";
    }

    // add scale bar to map
    L.control.scale().addTo(map);

    // add ruler to map
    L.control.ruler().addTo(map);

    // add printing function to map here using easyPrint plugin
    var printer = L.easyPrint({
        tileLayer: streets,
        sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
        filename: 'abq_map_slider',
        exportOnly: true,
        hideControlContainer: true
    }).addTo(map);
};