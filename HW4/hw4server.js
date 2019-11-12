var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/* Get Data Credentials from file outside web server's root directory*/
var credentials = require('./database_key.json');
var HOST = credentials.host;
var USER = credentials.user;
var PASSWORD = credentials.password;
var DATABASE = credentials.database;

/* Setup Database */
var con = mysql.createConnection({
	host: HOST,
	user: USER,
	password: PASSWORD,
	database: DATABASE
})

/* Connect to Database */
con.connect(function(err) {
	if (err) {
		console.log("Error connecting to database");
	}
	else {
		console.log("Database successfully connected");
	}
});

// Endpoint to search through Student Table
app.get('/getStudent', function (req, res) {
	con.query('SELECT * from student',
	function(err,rows,fields) {
		if (err) {
			console.log('Error during query processing');
		} else {
			var studentID = [];
			var firstName = [];
			var lastName = [];
			var birth = [];
			var major = []
			var header = ["Student ID", "First Name", "Last Name", "Birth", "Major"]

			// Extract Information
			for (var i = 0; i < rows.length; i++) {
				studentID = studentID.concat(rows[i].studentID);
				firstName = firstName.concat(rows[i].firstName);
				lastName = lastName.concat(rows[i].lastName);
				birth = birth.concat(rows[i].birth);
				major = major.concat(rows[i].major);
			}

			var data = [header, studentID, firstName, lastName, birth, major]
			res.write(JSON.stringify(data)); 
			res.end();
		}
	});
});

// Endpoint to search through Course Table
app.get('/getCourse', function (req, res) {
	con.query('SELECT * from course',
	function(err,rows,fields) {
		if (err) {
			console.log('Error during query processing');
		} else {
			var courseID = [];
			var description = [];
			var header = ["Course ID", "Course Description"]

			// Extract Information
			for (var i = 0; i < rows.length; i++) {
				courseID = courseID.concat(rows[i].courseID);
				description = description.concat(rows[i].description);
			}

			var data = [header, courseID, description]
			res.write(JSON.stringify(data)); 
			res.end();
		}
	});
});

// Endpoint to search through Grades Table
app.get('/getGrades', function (req, res) {
	con.query('SELECT * from grades',
	function(err,rows,fields) {
		if (err) {
			console.log('Error during query processing');
		} else {
			var ID = [];
			var courseID = [];
			var studentID = [];
			var term = [];
			var grade = [];
			var header = ["ID", "Course ID", "Student ID", "Term", "Grade"]

			// Extract Information
			for (var i = 0; i < rows.length; i++) {
				ID = ID.concat(rows[i].ID);
				courseID = courseID.concat(rows[i].courseID);
				studentID = studentID.concat(rows[i].studentID);
				term = term.concat(rows[i].term);
				grade = grade.concat(rows[i].grade);
			}

			var data = [header, ID, courseID, studentID, term, grade]
			res.write(JSON.stringify(data)); 
			res.end();
		}
	});
});

// Endpoint to get transcript of Student based on Term/Year
app.get('/getTranscript', function (req, res) {
	var firstName = req.query.firstName;
	var lastName = req.query.lastName;
	var term_choice = req.query.term_choice;

	con.query('SELECT student.studentID, firstName, lastName, term, grades.courseID, description, grade \
			   FROM grades INNER JOIN student ON student.studentID = grades.studentID \
			   INNER JOIN course ON course.courseID = grades.courseID \
			   WHERE firstName = ' + con.escape(firstName) + ' AND lastName = ' + con.escape(lastName) + ' AND term = ' + con.escape(term_choice),
	function(err,rows,fields) {
		if (err) {
			console.log(err);
		} else {
			console.log(rows)
			var studentID = [];
			var firstName = [];
			var lastName = [];
			var term = [];
			var courseID = [];
			var description = [];
			var grade = [];
			var header = ["Student ID", "First Name", "Last Name", "Term/Year", "Course ID", "Description", "Grade"]

			// Extract Information
			for (var i = 0; i < rows.length; i++) {
				studentID = studentID.concat(rows[i].studentID);
				firstName = firstName.concat(rows[i].firstName);
				lastName = lastName.concat(rows[i].lastName);
				term = term.concat(rows[i].term);
				courseID = courseID.concat(rows[i].courseID);
				description = description.concat(rows[i].description);
				grade = grade.concat(rows[i].grade);
			}

			var data = [header, studentID, firstName, lastName, term, courseID, description, grade]
			res.write(JSON.stringify(data)); 
			res.end();
		}
	});
});

// Endpoint to add new student to Student Table
app.post('/addStudent', function (req, res) {
	var studentID = req.body.studentID
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var birth = req.body.birth;
	var major = req.body.major;

	con.query('INSERT INTO student (studentID, firstName, lastName, birth, major) \
			   VALUE (' + con.escape(studentID) + ',' + con.escape(firstName) + ',' + con.escape(lastName) + ',' + con.escape(birth) + ',' + con.escape(major) + ")",
	function(err,rows,fields) {
		if (err) {
			console.log('Error during query processing');
			console.log(err);
		} else {
			var data = [firstName, lastName]
			res.write(JSON.stringify(data)); 
			res.end();
		}
	});
});

// Endpoint to get all students names
app.get('/studentDropdown', function (req, res) {
	con.query('SELECT * from student',
	function(err,rows,fields) {
		if (err) {
			console.log('Error during query processing');
		} else {
			var firstName = [];
			var lastName = [];

			// Extract Information
			for (var i = 0; i < rows.length; i++) {
				firstName = firstName.concat(rows[i].firstName);
				lastName = lastName.concat(rows[i].lastName);
			}

			var data = [firstName, lastName]
			res.write(JSON.stringify(data)); 
			res.end();
		}
	});
});

// Endpoint to get all term/year
app.get('/termDropdown', function (req, res) {
	// Distince to get unique values only
	con.query('SELECT DISTINCT term from grades',
	function(err,rows,fields) {
		if (err) {
			console.log('Error during query processing');
		} else {
			var term = [];

			// Extract Information
			for (var i = 0; i < rows.length; i++) {
				term = term.concat(rows[i].term);
			}

			var data = [term]
			res.write(JSON.stringify(data)); 
			res.end();
		}
	});
});

app.listen(4006, function(){
  console.log('Server Running');
});
