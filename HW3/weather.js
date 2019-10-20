// Extract Date/Time: Return Array
function extract_time(msg) {
	var json = JSON.parse(msg);
	var validTime = [];
	
	// Collect ValidTime
	for (var i = 0; i < 7; i++) {
		validTime = validTime.concat(json.response[0].periods[i].validTime);
	};

	return validTime;
};

// Extract Weather Description: Return Array.
function extract_weather_des(msg) {
	var json = JSON.parse(msg);
	var weather = [];
	
	for (var i = 0; i < 7; i++) {
		weather = weather.concat(json.response[0].periods[i].weather);
	}

	return weather;
};

// Extract Minimum Temperature: Return Array.
function extract_minTempF(msg) {
	var json = JSON.parse(msg);
	var minTempF = [];
	
	for (var i = 0; i < 7; i++) {
		minTempF = minTempF.concat(json.response[0].periods[i].minTempF);
	}

	return minTempF;
};

// Extract Maximum Temperature: Return Array.
function extract_maxTempF(msg) {
	var json = JSON.parse(msg);
	var maxTempF = [];
	
	for (var i = 0; i < 7; i++) {
		maxTempF = maxTempF.concat(json.response[0].periods[i].maxTempF);
	}

	return maxTempF;
};

// Extract Icon Names: Return Array.
function extract_icon_name(msg) {
	var json = JSON.parse(msg);
	var icon = [];
	
	for (var i = 0; i < 7; i++) {
		icon = icon.concat(json.response[0].periods[i].icon);
	}

	return icon;
};

function requestWeather(lat, lon) {
		var URL = "./getweather";
		$.ajax({
			type: "GET",
			url: URL,
			dataType: "text",
			timeout: 3000,
			data : {"lat": lat,
					"lon": lon},
			success : function(msg){
				// Parse out relevant information
				time_arr = extract_time(msg);
				weather_des_arr	= extract_weather_des(msg);
				minTemp_arr = extract_minTempF(msg);
				maxTemp_arr = extract_maxTempF(msg);
				icon_arr = extract_icon_name(msg);

				// DEBUG
				// $("#current").html(msg);
				console.log(time_arr);
				console.log(weather_des_arr);
				console.log(minTemp_arr);
				console.log(maxTemp_arr);
				console.log(icon_arr);
			},
			error: function(jgXHR, textStatus, errorThrown){
				alert("Error: " + textStatus + " " + errorThrown);
				error() 
			}
		});
	}