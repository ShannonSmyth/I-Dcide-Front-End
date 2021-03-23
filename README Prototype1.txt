Setup for Prototype 2:

1. Create a new database called “Prototype1”. In it use the following code to set up the database:

CREATE TABLE Codes (
    CodeVal int,
    userName VARCHAR(50),
    finished int,
    loginTime DATETIME,
    category VARCHAR(50),
    distance int,
    choice1 int,
    choice2 int,
    choice3 int,
    choice4 int,
    choice5 int
);

ALTER TABLE Codes ADD COLUMN finished VARCHAR(50) AFTER userName;
ALTER TABLE Codes DROP COLUMN username;

CREATE EVENT check_db ON SCHEDULE EVERY 10 MINUTE ENABLE 
  DO 
  DELETE FROM Codes WHERE `loginTime` < CURRENT_TIMESTAMP - INTERVAL 30 MINUTE;

DROP EVENT check_db;

2.

Add redis server using the links below

https://phoenixnap.com/kb/install-redis-on-mac 
https://medium.com/swlh/session-management-in-nodejs-using-redis-as-session store-64186112aa9

Make sure to start the redis server before running the code!!!! 

Finally make sure you use localhost:8080

3.

Need to make folders in the the same directory called 
"Restaurant Choice Files" with restaurant.js in it, 
"Results Page Files" with results.js in it, 
"Waiting Page Files" with waiting.js in it,
"css" with style.css" in it

4. 
Make a folder on your laptop (example prototype) and put all the files there.
on the terminal type "cd " and then drag the folder prototype into the terminal. Click enter.
type 
npm install mysql
npm install express
npm install express-session
npm install body-parser (not sure if we need it)
npm install redis
npm install connect-redis
npm install node-fetch




Hope it works!


