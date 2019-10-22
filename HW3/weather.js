// Function to reset table by removing existing rows
function resetTable() {
    $(".table tbody tr").remove();
}

// Function to get Geographic Location, Location Name/State, and Forecast
function getInfo() {
    // Obtain geographic coordinates.
    navigator.geolocation.getCurrentPosition(success, error);
	 
    // Request Weather and Location based on Lat. and Lon. if above function passes.
    function success(pos) {
        var lat = pos.coords.latitude;
        var lon = pos.coords.longitude;
        document.getElementById('geolocation').innerHTML = "Lat: " + lat + " Lon: " + lon;
		
        requestWeather(lat, lon);
        requestLocation(lat, lon);
    }

    // Function to return Weather Forecast.
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
                var data = JSON.parse(msg)
		  
		        var time_arr = data[0]
		        var weather_des_arr = data[1]
		        var minTemp_arr = data[2]
		        var maxTemp_arr = data[3]
		        var icon_arr = data[4]
		        var feelsLikeF_arr = data[5]
		        var pop = data[6]
		        var humidity = data[7]
			
		        var tbody = $('#body');
		        var count = 0;
		        var totalCells = 1;
		  
                // Fill Table
		        for (var i = 0; i < 7; i++) {
                    var tr = $('<tr/>').appendTo(tbody);
                    tr.append('<td class="table-light">' + time_arr[count] + '</td' + '</td>');
                    tr.append('<td class="table-light">' + maxTemp_arr[count] + "° / " + minTemp_arr[count] + '°</td>');
			        tr.append('<td class="table-light">' + feelsLikeF_arr[count] + '°</td>');
			        tr.append('<td class="table-light">' + pop[count] + '%</td>');
			        tr.append('<td class="table-light">' + humidity[count] + '%</td>');
			        tr.append('<td class="table-light">' + weather_des_arr[count] + '</td>');
			        tr.append('<td class="table-light"><img src="/css/icons/' +  icon_arr[count] + '"alt="" hspace="50" height=50 width=50></img></td>');
                    count++;
                } 
				
				// Remove error message if it existed
				document.getElementById('current').innerHTML = "";
            },
            error: function(jgXHR, textStatus, errorThrown) {
                alert("Error: " + textStatus + " " + errorThrown);
                error() 
		    }
	    });
    }
  
    // Function to return Location name/state.
    function requestLocation(lat, lon) {
	    var URL = "./getlocation";
	    $.ajax({
            type: "GET",
            url: URL,
            dataType: "text",
            timeout: 3000,
            data : {"lat": lat,
                    "lon": lon},
            success : function(msg){
                var data = JSON.parse(msg)
		        var place = data[0];
		        var state = data[1];
                document.getElementById('location').innerHTML = place + "," + state;
		    },
		    error: function(jgXHR, textStatus, errorThrown) {
			    alert("Error: " + textStatus + " " + errorThrown);
			    error() 
		    }
	    });
    }
  
    // If Browser cannot obtain geographic coordinates, return error message.
    function error() {
        document.getElementById('current').innerHTML = "There was an error! Please try again later.";
    }
}