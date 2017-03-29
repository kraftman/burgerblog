
var MapHandler = function(map,markers) {
  this.lat = 51.6660128;
  this.long = -0.4790519999999999;
  this.markers = markers;
  this.map = undefined;
};

MapHandler.prototype = function() {

  var showPosition = function(position){
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    console.log(this.map);
    console.log(this);

    this.map.panTo(new google.maps.LatLng(parseFloat(lat), parseFloat(long)));
    this.map.setZoom(10);
  },
  updateMarkers = function() {
    $.getJSON('/api/nearest/'+this.lat+'/'+this.long, function(data){
      $.each( data, function( key, burgerInfo ) {

        var pinIcon = new google.maps.MarkerImage(
          '/static/images/burger-fallback.png',
          null, /* size is determined at runtime */
          null, /* origin is 0,0 */
          null, /* anchor is bottom center of the scaled image */
          new google.maps.Size(20, 20)
        );
        var marker = new google.maps.Marker({map: this.map, icon: pinIcon});
        var newLatLng = new google.maps.LatLng(parseFloat(burgerInfo.lat), parseFloat(burgerInfo.long));
        //console.log(newLatLng)

        marker.setPosition(newLatLng);
        //marker.setLabel(burgerInfo.burgerName)
      });
    });
  },
  initMiniMap = function() {
    var myLatlng = {lat: this.lat, lng: this.long};
    var mapDiv = document.getElementById('minimap');
    this.map = new google.maps.Map(mapDiv, {
      center: {lat: this.lat, lng: this.long},
      zoom: 8
    });

    updateMarkers();
    google.maps.event.addListener(this.map, 'dragend',  updateMarkers );
    google.maps.event.addListener(this.map, 'zoom_changed',  updateMarkers );
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
    } else {
      myLatLong = new google.maps.LatLng(parseFloat(lat), parseFloat(long));
    }


    this.map.panTo(myLatLong);
    updateMarkers();

  };

  return {
    showPosition: showPosition,
    load: load,
    initMiniMap: initMiniMap,
    moveTo: moveTo
  };
}();


function InitMap(){
  myMapHandler.addMap();
  myMapHandler.checkMap();
}


var myMapHandler = new MapHandler();


$(function() {
  myMapHandler.load();

  $(".burger-icon-link, .burger-info-name").click(function(e) {
    e.stopPropagation();
  });

  $(".burger-panel").click(function() {

    lat = $(this).find('.burger-lat')[0].value;
    long = $(this).find('.burger-long')[0].value;

    myMapHandler.moveTo(lat, long);

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
