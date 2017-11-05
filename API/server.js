var express = require('express');
var app = express()
var parser = require('body-parser');
var mongoose = require('mongoose');

//Define Database Connection
var db = mongoose.connect('mongod://localhost/techmedia');

app.use(parser.json());
app.use(parser.urlencoded({extended : false}));

app.listen(3000,function(){
   console.log("Hello!"); 
});