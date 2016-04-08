

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

  var x = $("#demo");
  console.log('getting location')

  if (navigator.geolocation) {
    console.log('loc available')
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
    console.log('not supported')
  }
  function showPosition(position) {
    console.log('called '+ position.coords.latitude + " " + position.coords.longitude)
      x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
  }
})
