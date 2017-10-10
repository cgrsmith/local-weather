
//$(document).ready(function() {
document.addEventListener("DOMContentLoaded", function() {
  getLocation();
  document.getElementById("switchUnit").addEventListener("click", switchDegreeUnit);
  //$("#switchUnit").click(switchDegreeUnit);
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      getWeather(position.coords.latitude, position.coords.longitude);
    });
  } else {
    document.getElementById.innerHTML = "Your browser does not support geolocation";
    //$("#locationLabel").html("Your browser does not support geolocation");  
  }
}

function getWeather(lat, lon) {
  callAjax("https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon, showWeather);
  /*$.ajax( {
      url: "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon,
      success: showWeather,
      fail: function(e) {
        $("#locationLabel").html("Couldn't find your location");  
        console.log("Failed to fetch weather via api");
      },
      cache: false
  });*/
}

//no jquery
function callAjax(url, callback){
  var xmlhttp;
  // compatible with IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
          callback(JSON.parse(xmlhttp.responseText));
      } else {
        console.log("failed to retrieve");
      }
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function showWeather(weatherObject) {
  document.getElementById("locationLabel").innerHTML = weatherObject.name +", " + weatherObject.sys.country;
  document.getElementById("currentTemp").innerHTML = weatherObject.main.temp.toFixed(1);  
  document.getElementById("switchUnit").innerHTML = "\xB0C";
  hideToggle("circleLoader");
  document.getElementById("weatherIcon").src = weatherObject.weather[0].icon;
  document.getElementById("weatherDescription").innerHTML = weatherObject.weather[0].description;
  //$("#locationLabel").html(weatherObject.name +", " + weatherObject.sys.country);  
  //$("#currentTemp").html(weatherObject.main.temp.toFixed(1));
  //$("#switchUnit").html("\xB0C");
  //$("#circleLoader").hide();
  //$("#weatherIcon").attr("src", weatherObject.weather[0].icon);
  //$("#weatherDescription").html(weatherObject.weather[0].description);
}

//If no JQuery
function hideToggle(targetID) {
  let ele = document.getElementById(targetID);
  if (ele.style.display === "none") {
    ele.style.display = "block";
  } else {
    ele.style.display = "none";
  }
}

function switchDegreeUnit() {
  let currentUnit = document.getElementById("switchUnit").innerText;
  let newUnit = currentUnit === "\xB0C" ? "\xB0F" : "\xB0C";
  let oldTemp = parseFloat(document.getElementById("currentTemp").innerHTML);
  if (newUnit === "\xB0C" ) {
    document.getElementById("currentTemp").innerHTML = ((oldTemp - 32)*5/9).toFixed(1);
    //$("#currentTemp").html(((parseFloat($("#currentTemp").text()) - 32)*5/9).toFixed(1));
  } else {
    document.getElementById("currentTemp").innerHTML = (oldTemp*9/5 +32).toFixed(1);
    //$("#currentTemp").html((parseFloat($("#currentTemp").text())*9/5 + 32).toFixed(1));
  }
  document.getElementById("switchUnit").innerHTML = newUnit;
  //$("#switchUnit").html(newUnit);
}


