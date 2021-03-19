//Here I will implement a function to use the google places API
module.exports.coordiantes = function (a,b,c,d){
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);

    var request = require('request');

    var lat = a;
    var lon = b;
    var keyword = d;
    var output = 'json';
    var radius = c;
    var key = 'AIzaSyDpxoneR_heaf7yrAY5_NHf_jD3pyvW680';
    var type = 'restaurant';
    var parameters = '&radius=' + radius + '&location=' + lat + ',' + lon + '&key=' + key + '&type=' + type;
    var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/' + output + '?' + parameters;

    request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var json = JSON.parse(body);
        var results = json.results;

        for (var i = 0; i < results.length; i++) {
        console.log(results[i].place_id + ' - ' + results[i].name);
        }
    }
    });
}