
$(document).ready(function() {
  getLocation();
  $("#switchUnit").click(switchDegreeUnit);
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      getWeather(position.coords.latitude, position.coords.longitude);
    });
  } else {
    $("#locationLabel").html("Your browserr does not support geolocation");  
  }
}

function getWeather(lat, lon) {
  $.ajax( {
      url: "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon,
      success: showWeather,
      fail: function(e) {
        $("#locationLabel").html("Couldn't find your location");  
        console.log("Failed to fetch weather via api");
      },
      cache: false
  });
}

function showWeather(weatherObject) {
  $("#locationLabel").html(weatherObject.name +", " + weatherObject.sys.country);  
  $("#currentTemp").html(weatherObject.main.temp.toFixed(1));  
  $("#switchUnit").html("\xB0C");
  $(".circleLoader").hide();
  $("#weatherIcon").attr("src", weatherObject.weather[0].icon);
  $("#weatherDescription").html(weatherObject.weather[0].description);
}
  
function switchDegreeUnit() {
  let currentUnit = $("#switchUnit").text();
  let newUnit = currentUnit === "\xB0C" ? "\xB0F" : "\xB0C";
  if (newUnit === "\xB0C" ) {
    $("#currentTemp").html(((parseFloat($("#currentTemp").text()) - 32)*5/9).toFixed(1));
  } else {
    $("#currentTemp").html((parseFloat($("#currentTemp").text())*9/5 + 32).toFixed(1));
  }
  $("#switchUnit").html(newUnit);
}


