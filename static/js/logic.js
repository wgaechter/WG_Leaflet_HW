var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

var map = L.map("mapid", {
    center: [
        0, 0
    ],
    zoom: 2,
    layers: darkmap
    });

 
/* function markerRadius() {

};

function markerColor() {

};

var cirlceMarkerOptions = {
    radius: markerRadius(),
    fillColor: markerColor(),
    color: "#000",
    opacity: 1,
    fillOpacity: .3
}; */



d3.json(url, function(data) {
    console.log(data);
    console.log(data.features)

    var eq = data.features

    for (var i = 0; i < eq.length; i++) {

        var magRadius = 0;
        if (eq[i].properties.mag >= 7.0) {
            magRadius = 50;
        }
        else if (eq[i].properties.mag >= 6.0) {
            magRadius = 35;
        }
        else if (eq[i].properties.mag >= 5.0) {
            magRadius = 25;
        }
        else if (eq[i].properties.mag >= 4.0) {
            magRadius = 20;
        }
        else if (eq[i].properties.mag >= 3.0) {
            magRadius = 15;
        }
        else if (eq[i].properties.mag >= 2.0) {
            magRadius = 10;
        }
        else {
            magRadius = 5;
        }

        var depthColor = "";
        if (eq[i].geometry.coordinates[2] >= 90) {
            depthColor = "#8B0000";
        }
        else if (eq[i].geometry.coordinates[2] >= 70) {
            depthColor = "#FF0000";
        }
        else if (eq[i].geometry.coordinates[2] >= 50) {
            depthColor = "#FF0000";
        }
        else if (eq[i].geometry.coordinates[2] >= 30) {
            depthColor = "#FFFF00";
        }
        else if (eq[i].geometry.coordinates[2] >= 10) {
            depthColor = "#ADFF2F";
        }
        else {
            depthColor = "#00FF00"
        }
        
        L.circleMarker([eq[i].geometry.coordinates[1], eq[i].geometry.coordinates[0]], {
            color: "black",
            fillColor: depthColor,
            fillOpacity: .3,
            radius: magRadius
        }).bindPopup("<h3>" + eq[i].properties.title +
        "</h3><hr><p>" + new Date(eq[i].properties.time) + "</p>").addTo(map);
    }
});    

//LEGEND
var info = L.control({
    position: "bottomleft"
});

info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
};

info.addTo(map);