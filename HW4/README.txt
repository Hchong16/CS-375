Author: Harry Chong (hjc39)
CS375 Homework 4 Submission
11/13/2019

Setup:
1. Assuming the node modules and mySQL database have been setup, run the command 'node hw4server.js'.
   This will start up the server.
2. Access the website by going to 'http://localhost:8080/'

Use cases / Instructions:
1. The first portion of the application will allow the user to select and see the content within a tables 
   in the database. This includes a table called 'student', a table called 'grades', and a table called 'course'. 
   If no selection has been made, a message will notify the user to select an option.
   
2. The second portion of the application will allow the user to request a transcript for a specific student
   for a specific year/term. If there are no results, an error message will notify the user. If no or partial
   selections have been made, a message will notify the user of the problem.

3. The third portion of the application will allow the user to a new student to the database. All fields must be
   filled out or else the application will not accept the request. If the student has been successfully added, the 
   user will be notified. However, if the student that the user is trying to add is a duplicate or another problem
   arises, the user will be notified that the request failed. The potential MySQL injection have been dealt with by
   incoporating character escapes in the SQL query.
 