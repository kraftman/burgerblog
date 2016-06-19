console.log('this1')
var lat = 51.6660128
var long = -0.4790519999999999

function initMainMap() {
  console.log('main2g')
  var myLatlng = {lat: lat, lng: long};
  var mapDiv = document.getElementById('mainmap');
  var map = new google.maps.Map(mapDiv, {
    center: {lat: lat, lng: long},
    zoom: 8
  });
  google.maps.event.addListener(map, 'zoom_changed', function() {
    zoomLevel = map.getZoom();
    console.log(zoomLevel)
  });
}
