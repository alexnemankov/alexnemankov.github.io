var map;

function initMaps() {
    initMap('google-map', 17);
    initMap('google-map-zoomed-out', 15);
}

function initMap(mapWrapperId, zoomLevel) {

    map = new google.maps.Map(document.getElementById(mapWrapperId), {
        center: {
            lat: 53.890474,
            lng: 27.568485
        },
        zoom: zoomLevel,
        scrollwheel: false,
        styles: [{
            "featureType": "all",
            "elementType": "all",
            "stylers": [{
                "saturation": -100
            }, {
                "gamma": 0.5
            }]
        }]
    });
    var marker = new google.maps.Marker({
        position: {
            lat: 53.890474,
            lng: 27.568485
        },
        map: map,
        title: 'Фотошкола Blenda',
        icon: 'images/png/placeholder-small.png'
    });
    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Фотошкола Blenda</h1>' +
        '<div id="bodyContent">' +
        '<p>ул. Октябрьская, д.&nbsp;16, к.&nbsp;4</p>' +
        '</div>' +
        '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 400
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
}
