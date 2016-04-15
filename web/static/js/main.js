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

$(function() {

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


function initMiniMap() {
  var myLatlng = {lat: lat, lng: long};
  var mapDiv = document.getElementById('minimap');
  var map = new google.maps.Map(mapDiv, {
    center: {lat: lat, lng: long},
    zoom: 8
  });

  //var marker = new google.maps.Marker({map: map})


 $.getJSON('/api/nearest/'+lat+'/'+long, function(data){
   console.log(data)
   $.each( data, function( key, burgerInfo ) {
     var marker = new google.maps.Marker({map: map})
     console.log(parseFloat(burgerInfo.lat), parseFloat(burgerInfo.long))
     console.log(long)
     var newLatLng = new google.maps.LatLng(parseFloat(burgerInfo.lat), parseFloat(burgerInfo.long))

     marker.setPosition(newLatLng);
     marker.setLabel(burgerInfo.burgerName)
  });
 })



}
