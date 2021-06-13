document.addEventListener('DOMContentLoaded', function() {
  fetch_location_details("Mumbai","en");

  var location_names = document.getElementById("select_weather");
  location_names.addEventListener("change", function() {
	var select_lang = document.getElementsByName('select_lang');
	for (var langs of select_lang)
    {
        if (langs.checked) {
			var lang = langs.value;	
        }
    }
    fetch_location_details(this.value,lang);
  });  
  
	var language_change = document.getElementsByName("select_lang");
	language_change.forEach(function(e) {
       e.addEventListener("click", function() {             
		var location_name = document.getElementById("select_weather").value;
		fetch_location_details(location_name,e.value);  
       });
    });


  function fetch_location_details(locationName,lang){
    var link = "https://api.openweathermap.org/data/2.5/weather?q="+locationName+"&appid=HERE_YOUR_OPENWEATHER_API_KEY_GOES&lang="+lang;
    var request = new XMLHttpRequest();
    request.open('GET',link,true);
    request.onload = function(){
     var obj = JSON.parse(this.response);
     console.log(obj);

     document.getElementById('weather').innerHTML = obj.weather[0].description;
     document.getElementById('location').innerHTML = obj.name;
     document.getElementById('tempreature').innerHTML = (obj.main.temp - 273.15).toFixed(2);
     document.getElementById('icon').src = "http://openweathermap.org/img/w/" + obj.weather[0].icon + ".png";

     if (request.status >= 200 && request.status < 400) {
     var temp = obj.main.temp;
     }
     else{
      console.log("The city doesn't exist! Kindly check");
     }
    }
    request.send();

    var refreshWeather = document.getElementById('refresh_wheather');
    refreshWeather.addEventListener('click', function() {
      window.location.reload();
    });
  }

}, false);
