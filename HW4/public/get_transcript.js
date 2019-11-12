// Main function to request data from appropriate Database based on selection
function getTranscript() {
    // Student Selection
    var student = document.getElementById("student_dropdown");
    var student_choice = student.options[student.selectedIndex].text;

    // Break full name into individual variable
    var temp = student_choice.toString().split(', ');
    var firstName = temp[0];
    var lastName = temp[1];
    
    // Term/Year Selection
    var term = document.getElementById("term_dropdown");
    var term_choice = term.options[term.selectedIndex].value;

    // Output status of search based on selections
    if (student_choice == "Select a Student:" & term_choice == "Select a Term/Year:") {
        document.getElementById("transcript_result").innerHTML = "Please select a Student and a Term/Year!";
    } else if (student_choice == "Select a Student:" & term_choice != "Select a Term/Year:") {
        document.getElementById("transcript_result").innerHTML = "Please select a Student!";
    } else if (student_choice != "Select a Student:" & term_choice == "Select a Term/Year:") {
        document.getElementById("transcript_result").innerHTML = "Please select a Term/Year!";
    } else {
        requestTranscript(firstName, lastName, term_choice);
        document.getElementById("transcript_result").innerHTML = "You have selected " + firstName + ' ' + lastName + " for the following Term/Year: " + term_choice;
    }
}

// Function to request MySQL Student data from endpoint
function requestTranscript(firstName, lastName, term_choice) {
    var URL = "./getTranscript";
    $.ajax({
        type: "GET",
        url: URL,
        dataType: "text",
        timeout: 3000,
        data : {"firstName": firstName,
                "lastName": lastName,
                "term_choice": term_choice},
        success : function(msg){
            var data = JSON.parse(msg);
            var header = data[0];
            var studentID = data[1];
            var firstName = data[2];
            var lastName = data[3];
            var term = data[4];
            var courseID = data[5];
            var description = data[6];
            var grade = data[7];
			var header = ["Student ID", "First Name", "Last Name", "Term/Year", "Course ID", "Description", "Grade"];

            var theader = $('#student_table_header');
            var thcount = 0;

            var tbody = $('#student_table_body');
            var tbcount = 0;

            // Create Header for Table
            for (var i = 0; i < header.length; i++) {
                var th = $('<th/>').appendTo(theader);
                th.append(header[thcount]);
                thcount++;
            }

            // Fill Table
            // If return is empty, give status message
            if (grade.length == 0) {
                document.getElementById('transcript_status').innerHTML = "No results were found!";
            } else {
                // Fill Table
                for (var i = 0; i < grade.length; i++) {
                    var tr = $('<tr/>').appendTo(tbody);
                    tr.append('<td class="table-light">' + studentID[tbcount] + '</td>');
                    tr.append('<td class="table-light">' + firstName[tbcount] + '</td>');
                    tr.append('<td class="table-light">' + lastName[tbcount] + '</td>');
                    tr.append('<td class="table-light">' + term[tbcount] + '</td>');
                    tr.append('<td class="table-light">' + courseID[tbcount] + '</td>');
                    tr.append('<td class="table-light">' + description[tbcount] + '</td>');
                    tr.append('<td class="table-light">' + grade[tbcount] + '</td>');
                    tbcount++;
                }

                // Remove error message if it existed
                document.getElementById('transcript_status').innerHTML = "";
            };
        },
        error: function(jgXHR, textStatus, errorThrown) {
            alert("Error: " + textStatus + " " + errorThrown);
            error() 
        }
    });
}

// Return error message if error occurs.
function error() {
    document.getElementById('status').innerHTML = "There was an error! Please try again later.";
}

// Function to reset table by removing existing rows/headers
function resetTranscriptTable() {
    $("#transcript_table tbody tr").remove();
    $("#transcript_table thead th").remove();
}