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
    return new Route(route_data, map);
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

Route = function(data, map){
  this.name = data.name;
  this.title = data.title;
  this.type = data.type;
  this.map = map;

  this.kmlLayer = new google.maps.KmlLayer({
    url: location.href + 'kml/' + this.name + '.kml',
    preserveViewport: true,
    map: map
  });

  google.maps.event.addListener(map, 'idle',
      this.calculateVisibility.bind(this));
};
Route.prototype.calculateVisibility = function(){
  var mapValue = null;
  var layerBounds = this.kmlLayer.getDefaultViewport();
  if (!layerBounds){
    return;
  }
  var mapBounds = this.map.getBounds();
  var areaRatio = getArea(mapBounds.toSpan()) / getArea(layerBounds.toSpan());
  if (mapBounds.intersects(layerBounds) && areaRatio < 250) {
    mapValue = this.map;
  }
  this.kmlLayer.setMap(mapValue);
};
var getArea = function(latLngSpan){
  return latLngSpan.lat() * latLngSpan.lng();
};
