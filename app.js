function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 41.876, lng: -87.624}
  });

  var kml = new google.maps.KmlLayer({
    url: location.href + 'kml/mbta-cr.kml',
    map: map
  });
}
