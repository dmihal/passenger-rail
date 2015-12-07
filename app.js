kml_layers = [
  'amtrak',
  'mbta-cr',
  'bart',
  'path',
  'septa',
  'lirr',
  'mta',
  'metro-north'
];
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 41.876, lng: -87.624}
  });
  fetchStyle(map);

  var layers = kml_layers.map(function(name){
    return new google.maps.KmlLayer({
      url: location.href + 'kml/' + name + '.kml',
      map: map
    });
  });
}
function fetchStyle(map){
  var request = new XMLHttpRequest();
  request.open('GET', 'map-style.json', true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      map.setOptions({styles: data});
    }
  };
  request.send();
}
