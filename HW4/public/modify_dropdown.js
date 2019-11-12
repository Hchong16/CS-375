// Function to clean and create DropDown selections for Student Names and Terms.
function updateDropdown() {
    cleanup();
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

// Function to clean dropdown menu if it already exists
function cleanup() {
    var student_dropdown = document.getElementById("student_dropdown");
    var term_dropdown = document.getElementById("term_dropdown");

    for(var i = student_dropdown.options.length - 1 ; i >= 0 ; i--) {
        student_dropdown.remove(i);
    }

    for(var i = term_dropdown.options.length - 1 ; i >= 0 ; i--) {
        term_dropdown.remove(i);
    }
}