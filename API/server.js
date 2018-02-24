var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();
var router = express.Router();
var parser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');


var routes = require('./routes/router');



//Define Database Connection
var db = mongoose.connect("mongodb://user:admin@localhost:27017/techmedia" ,{auth:{authdb:"techmedia"}});

//Import Schemas
var User = require('./model/user');
var Posts = require('./model/posts');

//Variables
var userId;

//Using Middleware
app.use(parser.json());
app.use(parser.urlencoded({extended : false}));
//use sessions for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
  }));
app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin, Access-Control-Allow-Methods");
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  
  next();
});

app.use('/', routes);



// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
  if(err.name === "UnauthorizedError"){
    res.status(401);
    res.json({'message' : err.name + " : " + err.message});
  }
});

app.listen(3000,function(){
   console.log("Hello!"); 
});
