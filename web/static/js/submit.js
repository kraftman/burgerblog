
var lat = 51.6660128
var long = -0.4790519999999999

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
}

function initMap() {
  var myLatlng = {lat: lat, lng: long};
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    center: {lat: lat, lng: long},
    zoom: 8
  });

  var marker = new google.maps.Marker({map: map})

  if (navigator.geolocation) {
    marker.setPosition(myLatlng)
  }



  google.maps.event.addListener(map, 'click', function(event) {
     marker.setPosition(event.latLng)
     $('#lat').val(event.latLng.lat())
     $('#long').val(event.latLng.lng())
  });

}

$(function() {


})
