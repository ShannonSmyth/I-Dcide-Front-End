Setup for Prototype 2:

1. Restaurant.js has to be put in a folder called “Restaurant Choice Files”

2. Create a new database called “Prototype1”. In it use the following code to set up the database:

CREATE TABLE Codes (
    CodeVal int,
    loginTime DATETIME,
    category VARCHAR(50),
    distance int,
    choice1 int,
    choice2 int,
    choice3 int,
    choice4 int,
    choice5 int
);

3.

NEW: Add redis server using the links below

https://phoenixnap.com/kb/install-redis-on-mac 
https://medium.com/swlh/session-management-in-nodejs-using-redis-as-session store-64186112aa9

Make sure to start the redis server before running the code!!!! 

Finally make sure you use localhost:8080

4.

Need to make folders in the the same directory called 
"Restaurant Choice Files" with restaurant.js in it, 
"Results Page Files" with results.js in it, 
"Waiting Page Files" with waiting.js in it,
"css" with style.css" in it

Hope it works!


