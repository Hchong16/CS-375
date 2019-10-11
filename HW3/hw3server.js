// Author: Harry Chong
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var request =require('request');

app.use(express.static("."));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var credentials = require('./aeriskey.json');
var CLIENT_SECRET = credentials.secret;
var CLIENT_ID = credentials.id

app.post('/getWeather', function (req, res) {
	//var URL = 'https://api.aerisapi.com/observations/';
	var URL = "https://api.aerisapi.com/forecasts/" + req.body.latitude + "," + req.body.longitude + "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET;
	console.log(URL);
	request.get(URL, function(error, response, body){
		console.log(body);
		var json = JSON.parse(body);
		var city = json.name;
		// DO LATER: https://www.aerisweather.com/support/docs/api/reference/endpoints/forecasts/ extract things into table.
		//res.write(city+" " + temp + "F");
	});
});

app.listen(8080, function(){
	console.log('Server Running');
});