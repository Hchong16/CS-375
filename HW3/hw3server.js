// Author: Harry Chong
var express = require('express');
var request =require('request');
var app = express();
var bodyParser = require("body-parser");

app.use(express.static("."));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var credentials = require('./aeriskey.json');
var CLIENT_SECRET = credentials.secret;
var CLIENT_ID = credentials.id

app.get('/getweather', function (req, res) {
  var URL = "https://api.aerisapi.com/forecasts/" + req.query.lat + "," + req.query.lon + "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET;
  console.log(URL);
  request.get(URL, function(error, response, body){
    //console.log(body);
    var json = JSON.parse(body);
	var validTime = [];
	var weather = [];
	var minTempF = [];
	var maxTempF = [];
	var icon = [];
	
	// Parse Data into arrays:
	// Extract Date/Time
	for (var i = 0; i < 7; i++) {
		validTime = validTime.concat(json.response[0].periods[i].validTime);
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
	
	// Combine into list of arrays
	var data = [validTime, weather, minTempF, maxTempF, icon]
	res.write(JSON.stringify(data)); 
    res.end();
  }); 
});

app.listen(3015, function(){
  console.log('Server Running');
});