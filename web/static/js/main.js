
var MapHandler = function(map,markers) {
  this.lat = 51.6660128
  this.long = -0.4790519999999999
  this.map = map
  this.markers = markers
}

MapHandler.prototype = function() {

  return {

  };
}();


var lat = 51.6660128
var long = -0.4790519999999999
var map
var markers = [];

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
   console.log(lat, long)
   map.panTo(new google.maps.LatLng(parseFloat(lat), parseFloat(long)))
   map.setZoom(10)
}

$(function() {

  $(".burger-icon-link, .burger-info-name").click(function(e) {
   //do something
   e.stopPropagation();
})


  $(".burger-panel").click(function() {
    console.log('test')
    lat = $(this).find('.burger-lat')[0].value;
    long = $(this).find('.burger-long')[0].value;
    console.log(lat, long)
    var newLatLng = new google.maps.LatLng(parseFloat(lat), parseFloat(long))

    map.panTo(newLatLng);
    updateMarkers();
    return false;
  });

  //  Check Radio-box
    $(".rating input:radio").attr("checked", false);
    $('.rating input').click(function () {
        $(".rating span").removeClass('checked');
        $(this).parent().addClass('checked');
    });

    $('input:radio').change(
    function(){
        var userRating = this.value;
        //alert(userRating);
    });
})


function updateMarkers() {
  $.getJSON('/api/nearest/'+lat+'/'+long, function(data){
    console.log(data)
    $.each( data, function( key, burgerInfo ) {

      var pinIcon = new google.maps.MarkerImage(
        '/static/images/burger-fallback.png',
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(20, 20)
      );
      var marker = new google.maps.Marker({map: map, icon: pinIcon})
      //console.log(parseFloat(burgerInfo.lat), parseFloat(burgerInfo.long))
      //console.log(long)
      var newLatLng = new google.maps.LatLng(parseFloat(burgerInfo.lat), parseFloat(burgerInfo.long))
      //console.log(newLatLng)

      marker.setPosition(newLatLng);
      //marker.setLabel(burgerInfo.burgerName)
   });
  })
}


function initMiniMap() {
  var myLatlng = {lat: lat, lng: long};
  var mapDiv = document.getElementById('minimap');
   map = new google.maps.Map(mapDiv, {
    center: {lat: lat, lng: long},
    zoom: 8
  });

  //var marker = new google.maps.Marker({map: map})
  updateMarkers();
  google.maps.event.addListener(map, 'dragend',  updateMarkers );
  google.maps.event.addListener(map, 'zoom_changed',  updateMarkers );

}
