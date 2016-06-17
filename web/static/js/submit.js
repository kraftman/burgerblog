
var lat = 51.6660128
var long = -0.4790519999999999
var map2
var marker

if (navigator.geolocation) {
  console.log('loc available')
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  x.innerHTML = "Geolocation is not supported by this browser.";
  console.log('not supported')
}

function showPosition(position) {
   lat = position.coords.latitude
   long = position.coords.longitude
   console.log('got loc: ',lat, long)
   var newLatLng = new google.maps.LatLng(parseFloat(lat), parseFloat(long))
   map2.panTo(newLatLng)
   map2.setZoom(14)
   marker.setPosition(newLatLng)

}

function initMap() {
  var myLatlng = {lat: lat, lng: long};
  var mapDiv = document.getElementById('map');
    map2 = new google.maps.Map(mapDiv, {
    center: {lat: lat, lng: long},
    zoom: 8
  });

  marker = new google.maps.Marker({map: map2})

  if (navigator.geolocation) {
    marker.setPosition(myLatlng)
  }



  google.maps.event.addListener(map2, 'click', function(event) {
     marker.setPosition(event.latLng)
     $('#lat').val(event.latLng.lat())
     $('#long').val(event.latLng.lng())
  });
}
