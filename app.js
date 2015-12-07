function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 41.876, lng: -87.624}
  });
  fetchStyle(map);
  fetchRoutes(map);
}
function fetchRoutes(map){
  var request = new XMLHttpRequest();
  request.open('GET', 'routes.json', true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      addRoutes(data, map);
    }
  };
  request.send();
}
function addRoutes(data, map){
  var layers = data.map(function(route_data){
    return new google.maps.KmlLayer({
      url: location.href + 'kml/' + route_data.name + '.kml',
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
