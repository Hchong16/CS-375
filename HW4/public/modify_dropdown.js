// Function to call appropriate functions to DropDown selections
function updateDropdown() {
    updateStudents();
    updateTerms();
}

// Function to request MySQL for Student Names and Update Dropdown
function updateStudents() {
    var URL = "./studentDropdown";
    $.ajax({
        type: "GET",
        url: URL,
        dataType: "text",
        timeout: 3000,
        data : {},
        success : function(msg){
            var data = JSON.parse(msg)
            var firstName = data[0]
            var lastName = data[1]
            var student_dropdown = document.getElementById("student_dropdown");

            // Create Header for Table
            for (var i = 0; i < firstName.length; i++) {
                var option = document.createElement('option');
                option.text = option.value = firstName[i] + ', ' + lastName[i]
                student_dropdown.add(option, 1);
            }
        },
    });
}

// Function to request MySQL for Student Names and Update Dropdown
function updateTerms() {
    var URL = "./termDropdown";
    $.ajax({
        type: "GET",
        url: URL,
        dataType: "text",
        timeout: 3000,
        data : {},
        success : function(msg){
            var data = JSON.parse(msg)
            var term = data[0]
            var term_dropdown = document.getElementById("term_dropdown");

            // Create Header for Table
            for (var i = 0; i < term.length; i++) {
                var option = document.createElement('option');
                option.text = option.value = term[i];
                term_dropdown.add(option, 1);
            }
        },
    });
}