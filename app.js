kml_layers = [
  'amtrak',
  'mbta-cr',
  'bart',
  'path',
  'septa'
];
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 41.876, lng: -87.624}
  });

  var layers = kml_layers.map(function(name){
    return new google.maps.KmlLayer({
      url: location.href + 'kml/' + name + '.kml',
      map: map
    });
  });
}
