
var $ = require('jquery');

var MapHandler = require('./maphandler');
var myMapHandler = new MapHandler();
console.log('loaded main js');

window.burgerUtils = {
  preventDefaultBurgerAction: function(){
    $(".burger-icon-link, .burger-info-name").click(function(e) {
      e.stopPropagation();
    });
  },
  loadMap: function(){
    myMapHandler.initMiniMap();
  },
  addBurgerMapHandler: function(){
    $(".burger-panel").click(function() {

      lat = $(this).find('.burger-lat')[0].value;
      long = $(this).find('.burger-long')[0].value;

      myMapHandler.moveTo(lat, long);

      return false;
    });
  }
};


$(function() {
  myMapHandler.load();

  burgerUtils.preventDefaultBurgerAction();
  burgerUtils.addBurgerMapHandler();

});

// //  Check Radio-box
// $(".rating input:radio").attr("checked", false);
// $('.rating input').click(function () {
//   $(".rating span").removeClass('checked');
//   $(this).parent().addClass('checked');
// });
//
// $('input:radio').change(
// function(){
//   var userRating = this.value;
//   //alert(userRating);
// });
