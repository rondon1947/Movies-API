var express = require('express');
var request = require('request');
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("search");
});

app.get("/results", function(req, res){
    var movieTerm = req.query.movieTerm;
    var key = '&apikey=thewdb';
    request("http://www.omdbapi.com/?s=" + movieTerm + key, function(error, response, body){
        if(!error && response.statusCode == 200){
            var parsedData = JSON.parse(body);
            var data = [movieTerm, parsedData];
            res.render("results", {data: data});
        }            
    });
});

app.listen(3000, function(){
    console.log("Server started at localhost:3000");
});