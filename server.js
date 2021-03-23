var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var redis = require('redis');
var connectRedis = require('connect-redis');
var fetch = require('node-fetch');

//variable to use API from export
var placesAPI = require('./placesAPI.js');
//Variables to get from maps API to send to API
var longitude = -99.299118;
var latitude = 19.560318; //coordinates = -26.228889,-52.670833
var keyword = 'mexican'; //this is a parameter needed to specify a key word in the search of the API

var connection = mysql.createConnection({
 host     : 'localhost',
 user     : 'root',
 password : 'IGEN3302021', //this has to change if you run it on your computer, you should have set a password when setting up MySQL
 database : 'Prototype1' //name of my database in MySQl
});

var app = express();
app.use(session({
 secret: 'secret',
 resave: true,
 saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json()); //This parses the json for any POST request for you!

var RedisStore = connectRedis(session);
//Configure redis client
var redisClient = redis.createClient({
    host: 'localhost',
    port: 6379 //DO NOT CHANGE THIS, it doesn't run on other ones
})

// redisClient.on('error', function (err) {
//     console.log('Could not establish a connection with redis. ' + err);
// });
// redisClient.on('connect', function (err) {
//     console.log('Connected to redis successfully');
// });

//Configure session middleware
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'secret$%^134',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie
        maxAge: 1000 * 60 * 20 // time in milliseconds (here it expires in 20 minutes)
    }
}))

//global variables
var globalRestaurants = {
  "menu":["chicken","rice","cereal","bread","Pizza"],
  "restaurant":["RestA","RestB","RestC","RestD","RestE"]
}

app.get('/', function(request, response) { //home page
 response.sendFile(path.join(__dirname + '/index.html'));
 app.use(express.static('css'));
});

app.get('/joinGroup', function(request, response) { //home page
 response.sendFile(path.join(__dirname + '/joinGroup.html'));
 app.use(express.static('css'));
});

app.post('/joinGroup', function(request, response) { //join the group and get sent to restaurant decider page
 var sess = request.session;
 var code = request.body.code;
 sess.code = code;
 sess.username = request.body.username;
 if (code) {
   connection.query('INSERT INTO `Prototype1`.`Codes` (`CodeVal`,`userName`,`loginTime`,`finished`) VALUES (?,?,NOW(),0);', [code,sess.username], function(error, results, fields) {
   response.redirect('/');
   response.end();
   });
 }
});

app.get('/createGroup', function(request, response) { //sends to create group page
 response.sendFile(path.join(__dirname + '/newGroup.html'));
 app.use(express.static('css'));
});

app.post('/createGroup', function(request, response) { // host puts info in, gets restaurant choices
  var sess = request.session;
  sess.username = request.body.username;
  var distance = request.body.distance;
  radius = parseInt(distance);
  radius = radius*1000; //km to meters

  //create group code
  var num1 = Math.floor(Math.random() * Math.floor(99));
  var num2 = Math.floor(Math.random() * Math.floor(99));
  var num3 = Math.floor(Math.random() * Math.floor(99));
  var code = ""+num1+num2+num3;
  code = parseInt(code);
  sess.code = code;

  //get restaurant choices for the group
  //Adding google API function here
  //var placeName = placesAPI.coordinates(latitude, longitude, radius, keyword);

//////////////////////////////This is where the API will fill in globalRestaurants object
  restaurant(latitude, longitude, radius, keyword, code, distance);
//////////////////////////////

  connection.query('INSERT INTO `Prototype1`.`Codes` (`CodeVal`,`userName`,`distance`,`loginTime`,`finished`) VALUES (?,?,?,NOW(),0);', [code,sess.username,distance], function(error, results, fields) {
  response.redirect('/');
  response.end();
  });

});

app.post('/sendRestOfUserData', function(request, response) { //post all the results to the server and database then send to restaurant choices
  var distance = request.body;
  var sess = request.session;
  connection.query('UPDATE `Prototype1`.`Codes` SET distance = ? WHERE CodeVal = ? AND userName = ?;', [sess.code, sess.username], function(error, results, fields) {
  });
  response.end();
});

app.get('/getStarted', function(request, response) { //display group code
  response.sendFile(path.join(__dirname + '/get_started.html'));
});

app.get('/getCode', function(request, response) { //get group code for getStarted page
  var sess = request.session;
  response.json(JSON.stringify(sess.code));
});

app.get('/restaurantDecide', function(request, response){ //restaurant decision page
  response.sendFile(path.join(__dirname + '/restaurantDecide.html'));
  app.use(express.static('Restaurant Choice Files'));
})

app.get('/restaurantChoices', function(request, response){ //send restaurant choices to client
  response.json(JSON.stringify(globalRestaurants));
})

app.post('/responseToDB', function(request, response) { //post all the results to the server and database then redirect to waiting page
  var restaurantResponses = request.body;
  var sess = request.session;
  //console.log(sess.username);
  connection.query('UPDATE `Prototype1`.`Codes` SET choice1 = ?, choice2 = ?, choice3 = ?, choice4 = ?,choice5 = ?,finished = 1 WHERE CodeVal = ? AND userName = ?;', [restaurantResponses[0],restaurantResponses[1],restaurantResponses[2],restaurantResponses[3],restaurantResponses[4], sess.code, sess.username], function(error, results, fields) {
  });
  response.end();
});


app.get('/waitingPage', function(request, response) { //display group code
  response.sendFile(path.join(__dirname + '/waitingPage.html'));
  app.use(express.static('Waiting Page Files'));
});

app.get('/username', function(request, response) { //get username of clients, and check if finished going through options
  var sess = request.session;
  var users = [];
  connection.query('SELECT userName, finished FROM `Prototype1`.`Codes` WHERE codeVal = ?;', [sess.code], function(error, results, fields) {
    users[0] = results;
    users[1] = sess.username;
    response.json(JSON.stringify(users));
  });
});

app.get('/Results', function(request, response) { //display group code
  response.sendFile(path.join(__dirname + '/Results.html'));
  app.use(express.static('Results Page Files'));
});

app.get('/sendResults', function(request, response) {
  var sess = request.session;
  var users = [];
  connection.query('SELECT userName,choice1,choice2,choice3,choice4,choice5 FROM `Prototype1`.`Codes` WHERE codeVal = ?;', [sess.code], function(error, results, fields) {
    users[0] = results;
    users[1] = sess.username;
    response.json(JSON.stringify(users));
  });
});

app.post('/newRound', function(request, response) { //join the group and get sent to restaurant decider page
 var sess = request.session;
 connection.query('UPDATE `Prototype1`.`Codes` SET finished = 0 WHERE codeVal = ? AND userName = ?;', [sess.code, sess.username], function(error, results, fields) {
 response.redirect('/restaurantDecide');
 response.end();
 });
});

app.post('/logout', function(request, response) {
  //clear data
  connection.query('DELETE FROM `Prototype1`.`Codes` WHERE CodeVal=?;', [request.session.code], function(error, results, fields) {

  });
  response.redirect('/');
});

function restaurant(latitude, longitude, radius, keyword, code, distance){
  var lat = latitude;
  var lon = longitude;
  var output = 'json';
  var key = 'AIzaSyDpxoneR_heaf7yrAY5_NHf_jD3pyvW680';
  var type = 'restaurant';
  var parameters = '&radius=' + radius + '&location=' + lat + ',' + lon + '&key=' + key + '&type=' + type;
  var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/' + output + '?' + parameters;

  var results =  fetch(url)
  .then(response => response.json())
  .then(json => json.results)
  .then(results =>{
    result = results[1].name;
    connection.query('INSERT INTO `Prototype1`.`Codes` (`CodeVal`,`userName`,`distance`,`loginTime`,`finished`) VALUES (?,?,?,NOW(),0);', [code,result,distance], function(error, results, fields) {
    });
  });
}

app.listen(8080);
