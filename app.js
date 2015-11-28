function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 41.876, lng: -87.624}
  });

  var ctaLayer = new google.maps.KmlLayer({
    url: 'kml/mbta.kml',
    map: map
  });
}
