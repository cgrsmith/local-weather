//Initialise with a quote and set the new-quote button
$(document).ready(function() {
  //getWeather("-27","153");
  getLocation();
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      getWeather(position.coords.latitude, position.coords.longitude);
    });
  }
}

function getWeather(lat, long) {
  $.ajax( {
      url: "https://fcc-weather-api.glitch.me/api/current?lat=" 
         + lat + "&lon=" + long,
      success: showWeather,
      fail: function(e) {
        console.log("Failed to fetch quote via api");
      },
      cache: false
  });
}

function showWeather(weatherObject) {
  $("#locationLabel").html(weatherObject.name +", " + weatherObject.sys.country);  
  $("#currentTemp").html(weatherObject.main.temp);  
  $("#weatherIcon").attr("src", weatherObject.weather[0].icon);
  $("#weatherDescription").html(weatherObject.weather[0].description);
}


/* API Response Format

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    $("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
  });
}

{ "coord":{ "lon":159, "lat":35 }, "weather":[ { "id":500, "main":"Rain", "description":"light rain", "icon":"https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F10n.png?1499366021399" } ], "base":"stations", "main":{ "temp":22.59, "pressure":1027.45, "humidity":100, "temp_min":22.59, "temp_max":22.59, "sea_level":1027.47, "grnd_level":1027.45 }, "wind":{ "speed":8.12, "deg":246.503 }, "rain":{ "3h":0.45 }, "clouds":{ "all":92 }, "dt":1499521932, "sys":{ "message":0.0034, "sunrise":1499451436, "sunset":1499503246 }, "id":0, "name":"", "cod":200 }
*/