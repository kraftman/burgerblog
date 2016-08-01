
var lat = 51.6660128
var long = -0.4790519999999999
var mainMap

function initMainMap() {

  var myLatlng = {lat: lat, lng: long};
  var mapDiv = document.getElementById('mainmap');
  mainMap = new google.maps.Map(mapDiv, {
    center: {lat: lat, lng: long},
    zoom: 8
  });


  updateMainMarkers();
  console.log('this')
  google.maps.event.addListener(mainMap, 'dragend',  updateMainMarkers );
  google.maps.event.addListener(mainMap, 'zoom_changed',  updateMainMarkers );
}



function updateMainMarkers() {
  console.log('then this')
  $.getJSON('/api/nearest/'+lat+'/'+long, function(data){
    console.log(data)
    $.each( data, function( key, burgerInfo ) {
      var image = {
          url: '/static/images/burger-fallback.png',
          size: new google.maps.Size(30, 30),
        };
        var pinIcon = new google.maps.MarkerImage(
              '/static/images/burger-fallback.png',
              null, /* size is determined at runtime */
              null, /* origin is 0,0 */
              null, /* anchor is bottom center of the scaled image */
              new google.maps.Size(20, 20)
          );
      var marker = new google.maps.Marker({map: mainMap, icon: pinIcon})
      //console.log(parseFloat(burgerInfo.lat), parseFloat(burgerInfo.long))
      //console.log(long)
      var newLatLng = new google.maps.LatLng(parseFloat(burgerInfo.lat), parseFloat(burgerInfo.long))
      //console.log(newLatLng)

      marker.setPosition(newLatLng);
      //marker.setLabel(burgerInfo.burgerName)
   });
  })
}
