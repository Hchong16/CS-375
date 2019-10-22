var express = require('express');
var request =require('request');
var app = express();
var bodyParser = require("body-parser");

app.use(express.static("."));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/* Get Credientials */
var credentials = require('./aeriskey.json');
var CLIENT_SECRET = credentials.secret;
var CLIENT_ID = credentials.id

/* Get Weather Forecast through API call, parse out JSON response and return to client.
   Retrieve Timestamp, Weather Description, Minimum Temp (F), Maximum Temp (F), Icon Name, 
   FeelsLike (F), Precepitation, and Humidity */
app.get('/getweather', function (req, res) {
  var URL = "https://api.aerisapi.com/forecasts/" + req.query.lat + "," + req.query.lon + "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET;
  console.log(URL);
  request.get(URL, function(error, response, body){
    //console.log(body);
    var json = JSON.parse(body);
	var timeStamp = [];
	var weather = [];
	var minTempF = [];
	var maxTempF = [];
	var icon = [];
	var feelsLikeF = [];
	var pop = [];
	var humidity = [];
	
	// Parse Data into arrays:
	// Extract Date/Time
	for (var i = 0; i < 7; i++) {
		
		// Time in Epoch format: Convert to readable format
		var temp = json.response[0].periods[i].timestamp;
		var date = new Date(temp * 1000);

		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		
		var formatted = month + "-" + day + "-" + year;
		timeStamp = timeStamp.concat(formatted);
	};

	// Extract Weather Description
	for (var i = 0; i < 7; i++) {
		weather = weather.concat(json.response[0].periods[i].weather);
	}

	// Extract Minimum Temperature
	for (var i = 0; i < 7; i++) {
		minTempF = minTempF.concat(json.response[0].periods[i].minTempF);
	}
	
	// Extract Maximum Temperature
	for (var i = 0; i < 7; i++) {
		maxTempF = maxTempF.concat(json.response[0].periods[i].maxTempF);
	}

	// Extract Icon Names
	for (var i = 0; i < 7; i++) {
		icon = icon.concat(json.response[0].periods[i].icon);
	}
	
	// Extract Feels Like
	for (var i = 0; i < 7; i++) {
		feelsLikeF = feelsLikeF.concat(json.response[0].periods[i].feelslikeF);
	}
	
	// Extract Probability of precipitation.
	for (var i = 0; i < 7; i++) {
		pop = pop.concat(json.response[0].periods[i].pop);
	}
	
	// Extract Humidity  percentage
	for (var i = 0; i < 7; i++) {
		humidity = humidity.concat(json.response[0].periods[i].humidity);
	}
	
	// Combine into list of arrays
	var data = [timeStamp, weather, minTempF, maxTempF, icon, feelsLikeF, pop, humidity]
	res.write(JSON.stringify(data)); 
    res.end();
  }); 
});

/* Get Location Name and State from API call based on GeoLocation and parse out JSON response
   and send to Client. */
app.get('/getlocation', function (req, res) {
  var URL = "https://api.aerisapi.com/places/closest?p=" + req.query.lat + "," + req.query.lon + "&format=json&client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET;
  console.log(URL);
  request.get(URL, function(error, response, body){
    console.log(body);
    var json = JSON.parse(body);
	
	var place = json.response[0].place.name;
	var state = json.response[0].place.state;
	var data = [place, state]

    res.write(JSON.stringify(data));
    res.end();
  });
});

app.listen(8080, function(){
  console.log('Server Running');
});