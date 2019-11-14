// Main function to request data from specific endpoint based on selection
function getInfo() {
    // Database Selection
    var selection = document.getElementById("database_selection");
    var choice = selection.options[selection.selectedIndex].value;
    var choice_label = selection.options[selection.selectedIndex].text;

    // Output status of search based on selections
    if ((choice == 1) || (choice == 2) || (choice == 3)) {
        document.getElementById("database_result").innerHTML = "You have selected the following database: " + choice_label;
    } else {
        document.getElementById("database_result").innerHTML = "Please select a database!";
    }
    
    if (choice == 1) {
        requestStudent();
    } else if (choice == 2) {
        requestCourse();
    } else if (choice == 3) {
        requestGrades();
    }
}

// Function to request endpoint for student data 
function requestStudent() {
    var URL = "./getStudent";
    $.ajax({
        type: "GET",
        url: URL,
        dataType: "text",
        timeout: 3000,
        data : {},
        success : function(msg){
            var data = JSON.parse(msg);
            var header = data[0];
            var studentID = data[1];
            var firstName = data[2];
            var lastName = data[3];
            var birth = data[4];
            var major = data[5];

            var theader = $('#database_header');
            var thcount = 0;

            var tbody = $('#database_body');
            var tbcount = 0;

            // Create Header for Table
            for (var i = 0; i < header.length; i++) {
                var th = $('<th/>').appendTo(theader);
                th.append(header[thcount]);
                thcount++;
            }

            // Fill Table
            for (var i = 0; i < studentID.length; i++) {
                var tr = $('<tr/>').appendTo(tbody);
                tr.append('<td class="table-light">' + studentID[tbcount] + '</td>');
                tr.append('<td class="table-light">' + firstName[tbcount] + '</td>');
                tr.append('<td class="table-light">' + lastName[tbcount] + '</td>');
                tr.append('<td class="table-light">' + birth[tbcount] + '</td>');
                tr.append('<td class="table-light">' + major[tbcount] + '</td>');
                tbcount++;
            }
            
            // Remove error message if it existed
            document.getElementById('status').innerHTML = "";
        },
        error: function(jgXHR, textStatus, errorThrown) {
            alert("Error: " + textStatus + " " + errorThrown);
            error() 
        }
    });
}

// Function to request endpoint for course data 
function requestCourse() {
    var URL = "./getCourse";
    $.ajax({
        type: "GET",
        url: URL,
        dataType: "text",
        timeout: 3000,
        data : {},
        success : function(msg){
            var data = JSON.parse(msg);
            var header = data[0];
            var courseID = data[1];
            var description = data[2];

            var theader = $('#database_header');
            var thcount = 0;

            var tbody = $('#database_body');
            var tbcount = 0;
            
            // Create Header for Table
            for (var i = 0; i < header.length; i++) {
                var th = $('<th/>').appendTo(theader);
                th.append(header[thcount]);
                thcount++;
            }

            // Fill Table
            for (var i = 0; i < courseID.length; i++) {
                var tr = $('<tr/>').appendTo(tbody);
                tr.append('<td class="table-light">' + courseID[tbcount] + '</td>');
                tr.append('<td class="table-light">' + description[tbcount] + '</td>');
                tbcount++;
            }
            
            // Remove error message if it existed
            document.getElementById('status').innerHTML = "";
        },
        error: function(jgXHR, textStatus, errorThrown) {
            alert("Error: " + textStatus + " " + errorThrown);
            error() 
        }
    });
}

// Function to request endpoint for grades data 
function requestGrades() {
    var URL = "./getGrades";
    $.ajax({
        type: "GET",
        url: URL,
        dataType: "text",
        timeout: 3000,
        data : {},
        success : function(msg){
            var data = JSON.parse(msg);
            var header = data[0];
            var ID = data[1];
            var courseID = data[2];
            var studentID = data[3];
            var term = data[4];
            var grade = data[5];

            var theader = $('#database_header');
            var thcount = 0;

            var tbody = $('#database_body');
            var tbcount = 0;
            
            // Create Header for Table
            for (var i = 0; i < header.length; i++) {
                var th = $('<th/>').appendTo(theader);
                th.append(header[thcount]);
                thcount++;
            }

            // Fill Table
            for (var i = 0; i < ID.length; i++) {
                var tr = $('<tr/>').appendTo(tbody);
                tr.append('<td class="table-light">' + ID[tbcount] + '</td>');
                tr.append('<td class="table-light">' + courseID[tbcount] + '</td>');
                tr.append('<td class="table-light">' + studentID[tbcount] + '</td>');
                tr.append('<td class="table-light">' + term[tbcount] + '</td>');
                tr.append('<td class="table-light">' + grade[tbcount] + '</td>');
                tbcount++;
            }
            
            // Remove error message if it existed
            document.getElementById('status').innerHTML = "";
        },
        error: function(jgXHR, textStatus, errorThrown) {
            alert("Error: " + textStatus + " " + errorThrown);
            error() 
        }
    });
}

// Function to return error message if AJAX request fails
function error() {
    document.getElementById('status').innerHTML = "There was an error! Please try again later.";
}

// Function to reset table by removing existing rows/headers
function resetDatabaseTable() {
    $("#database_table tbody tr").remove();
    $("#database_table thead th").remove();
}
