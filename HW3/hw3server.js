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
	//var URL = 'https://api.aerisapi.com/observations/';
	var URL = "https://api.aerisapi.com/forecasts/" + req.query.lat + "," + req.query.lon + "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET;
	console.log(URL);
	request.get(URL, function(error, response, body){
		//console.log(body);
		var json = JSON.parse(body);
		res.write(body);
		res.end();
	}); 
});

app.listen(3014, function(){
	console.log('Server Running');
});