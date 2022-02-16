var express = require("express")
var app = express();
const mongoose = require("mongoose");
var bodyparser = require("body-parser");
var routes = require("./routes/routers");

//to overrite mongoose promise object with nodejs promis
mongoose.Promise = global.Promise

//define url for mongodb connect
var url = "mongodb://localhost:27017/test";

//to make connection
mongoose.connect(url, {
        //useMongoClient: true,  //not needed in 
        connectTimeoutMS: 1000
    })
    .then((result) => { console.log("Successfullty connected to database") })
    .catch((err) => { console.log("could not connect to the database", err) });

///define moddleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
///routing
app.use('/', routes);
//start the server
app.listen(4000);
console.log("server started at port 4000");

module.exports = app;