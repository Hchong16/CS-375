// Function to request endpoint to add Student to MySQL database
function addStudent(studentID, firstName, lastName, birth, major) {
    var URL = "/addStudent";
    $.ajax({
        type: "POST",
        url: URL,
        dataType: "text",
        timeout: 3000,
        data : {"studentID": studentID,
                "firstName": firstName,
                "lastName": lastName,
                "birth": birth,
                "major": major},
        success : function(msg){
            var data = JSON.parse(msg);
            var firstName = data[0];
            var lastName = data[1];

            // Write success status to frontend
            document.getElementById('student_status').innerHTML = "Student " + firstName + " " + lastName + " was successfully added!";

            // Update the DropDown menu for the Student Transcript secrion
            updateDropdown()
        },
        error: function(jgXHR, textStatus, errorThrown) {
            // Output error alert and write error status to frontend.
            alert("Error: " + textStatus + " " + errorThrown);
            error();
        }
    });
}

// Function to return error message if AJAX request fails
function error() {
    document.getElementById('student_status').innerHTML = "There was an error! Please check the inputs and try again.";
}
