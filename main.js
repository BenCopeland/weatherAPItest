var API_URL = 'http://api.wunderground.com/api/151eae23ce15ef82/conditions/geolookup/forecast10day/q/'
var lookUp = document.querySelector('.lookup');
var locate = document.querySelector('.locationbtn');

/*lookup button function*/
lookUp.onclick = function () {
  var zip = document.querySelector('input').value;
  
  getJSON(API_URL + zip + '.json', function (data) {
  	var currTemp = document.querySelector('.temp');
    var currHum = document.querySelector('.humidity');
    var currLoc = document.querySelector('.location');
  	currLoc.innerHTML = data.current_observation.display_location.full;
  	currTemp.innerHTML = data.current_observation.temperature_string;
    currHum.innerHTML = data.current_observation.relative_humidity;
	});
};

/*location button function*/
locate.onclick = function () {
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    
    getJSON(API_URL + lat + "," + lon + '.json', function (data) {
  	  var currTemp = document.querySelector('.temp');
      var currHum = document.querySelector('.humidity');
      var currLoc = document.querySelector('.location');
  	
      currLoc.innerHTML = data.current_observation.display_location.full;
      currTemp.innerHTML = data.current_observation.temperature_string;
      currHum.innerHTML = data.current_observation.relative_humidity;
    });
  });
};



function getJSON(url, cb) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url);
  xhr.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      cb(JSON.parse(this.response));
    }
  };

  xhr.send();
}
