
var $ = require('jquery');

var MapHandler = function() {
  this.lat = 51.6660128;
  this.long = -0.4790519999999999;
  this.markers = {};
  this.map = undefined;
};

MapHandler.prototype = function() {

  var showPosition = function(position){
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    moveTo.call(this, lat, long);
  },
  updateMarkers = function() {

    var context = this;

    $.getJSON('/api/nearest/'+this.lat+'/'+this.long, function(data){
      $.each( data, function( key, burgerInfo ) {
        if (!(burgerInfo.burgerID in context.markers)) {
          console.log('actually crating burger marker');
          var pinIcon = new google.maps.MarkerImage(
            '/static/images/burger-fallback.png',
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new google.maps.Size(20, 20)
          );
          var newLatLng = new google.maps.LatLng(parseFloat(burgerInfo.lat), parseFloat(burgerInfo.long));
          var marker = new google.maps.Marker({position: newLatLng, icon: pinIcon});
          marker.setMap(context.map);
          context.markers[burgerInfo.burgerID] = marker;
          console.log(context.markers);

        // marker.setLabel(burgerInfo.burgerName)
        }
      });
    });
  },
  initMiniMap = function() {

    var mapDiv = document.getElementById('minimap');
    this.map = new google.maps.Map(mapDiv, {
      center: {lat: this.lat, lng: this.long},
      zoom: 10
    });

    updateMarkers.call(this);
    var context = this;
    google.maps.event.addListener(this.map, 'dragend',  function() {updateMarkers.call(context);} );
    google.maps.event.addListener(this.map, 'zoom_changed',  function() {updateMarkers.call(context);} );
  },
  load = function() {
    if (navigator.geolocation) {
      var context = this;
      navigator.geolocation.getCurrentPosition(function(position) {showPosition.call(context, position);});
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
      console.log('not supported');
    }
  },
  moveTo = function(lat,long){
    var myLatLong;
    if (long === 'undefined') {
      myLatLong = lat;
      this.lat = myLatLong.lat();
      this.long = myLatLong.lng();
    } else {
      myLatLong = new google.maps.LatLng(parseFloat(lat), parseFloat(long));
      this.lat = lat;
      this.long = long;
    }


    this.map.panTo(myLatLong);
    updateMarkers.call(this);

  };

  return {
    showPosition: showPosition,
    load: load,
    initMiniMap: initMiniMap,
    moveTo: moveTo
  };
}();

module.exports = MapHandler;
