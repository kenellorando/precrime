var map, infoWindow;

function getCurrentLocation() {
    $.getJSON('https://data.cityofchicago.org/resource/d62x-nvdr.json', function (data) {
        navigator.geolocation.watchPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        });
        for (i = 0; i < data.length; i++) {
            if (parseFloat(data[i].latitude).toFixed(3) - parseFloat(pos.lat).toFixed(3) < 1 ||
                parseFloat(data[i].longitude).toFixed(3) - parseFloat(pos.lng).toFixed(3) < 0.001) {
                alert("Game Over!");
            }
        }
    });
}

function setLocation() {
    $.getJSON('https://data.cityofchicago.org/resource/d62x-nvdr.json', function (data) {
        navigator.geolocation.watchPosition(function (position) {

            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            for (i = 0; i < data.length; i++) {
                if (Math.abs(Math.abs(parseFloat(data[i].latitude).toFixed(3)) -
                        Math.abs(parseFloat(pos.lat).toFixed(3))) < 0.001 &&
                    Math.abs(Math.abs(parseFloat(data[i].longitude).toFixed(3)) -
                        Math.abs(parseFloat(pos.lng).toFixed(3))) < 0.001) {
                    alert("You are closing dangerous area!");
                    console.log(Math.abs(Math.abs(parseFloat(data[i].latitude).toFixed(3)) -
                            Math.abs(parseFloat(pos.lat).toFixed(3))),
                        Math.abs(Math.abs(parseFloat(data[i].longitude).toFixed(3)) -
                            Math.abs(parseFloat(pos.lng).toFixed(3))))
                    break;
                }
            }

            console.log("Refreshing position: " + pos.lat + " " + pos.lng);
            document.getElementById("coords").append("Refreshing position: " + pos.lat + " " + pos.lng);
            document.getElementById("coords").append("\n");

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    });
}

function initMap() {
    infoWindow = new google.maps.InfoWindow;
    setLocation();

    $.getJSON('https://data.cityofchicago.org/resource/d62x-nvdr.json', function (data) {
        var la = data[0].latitude;
        var lo = data[0].longitude;
        console.log(la, lo);
        la = parseFloat(la).toFixed(3);
        lo = parseFloat(lo).toFixed(3);

        var uluru = {
            lat: parseFloat(la),
            lng: parseFloat(lo)
        };

        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: uluru
        });


        for (i = 0; i < data.length; i++) {
            var crime = data[i].primary_type
            var la = data[i].latitude
            var lo = data[i].longitude
            la = parseFloat(la).toFixed(3);
            lo = parseFloat(lo).toFixed(3);
            var uluru = {
                lat: parseFloat(la),
                lng: parseFloat(lo)
            }
            var m = new Date();
            if ((parseFloat(data[i].date.substring(5, 7)) == (m.getMonth() + 1)) &&
                (data[i].primary_type == "ROBBERY" || data[i].primary_type == "ASSAULT")) {
                var marker = new google.maps.Marker({
                    position: uluru,
                    map: map
                });
            }
        }
    });

}