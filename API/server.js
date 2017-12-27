var express = require('express');
var app = express();
var parser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

//Define Database Connection
var db = mongoose.connect("mongodb://user:admin@localhost:27017/techmedia" ,{auth:{authdb:"techmedia"}});

//Import Schemas
var User = require('./model/user');
var Posts = require('./model/posts');


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

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin");
  res.header("Access-Control-Allow-Origin", "*");
  
  next();
});

// ___________________________________________________ POST Method Routes ____________________________________ //



app.post('/', function(req,res){
    var Post = new Posts(req.body);
    /* Long Declaration
    Post.title = req.body.title;
    Post.topic = req.body.topic;
    Post.tag = req.body.tag;
    Post.people = req.body.people;

    Post.content.file = req.body.content.files;
    Post.content.image = req.body.content.image;
    Post.content.videos= req.body.content.videos;
    Post.content.text = req.body.content.text;
    */
    Post.save(function(err, save){
        if (err){
            res.status(500).send({error : "Couldn't upload post to database"});
        }
        else {
            res.status(200).send(save);
        }
    });
});

app.post('/auth', function (req, res,next){
    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.realname) {
      
        var userData = {
          
          username: req.body.username,
          realname : req.body.realname,
          email: req.body.email,
          password: req.body.password
        }
      
        //use schema.create to insert data into the db
        User.create(userData, function (err, user) {

          // if there is an error while creating user  
          if (err) {
            console.log("error occured while creating user " + err);
            res.status(500).send({error : err});
            // success create new user / registered new user
          } else {
            console.log("Success!");
            req.session.userId = user._id;
            res.status(200).send("Success registering new user!");
            
          }
        });
      }
      else if (req.body.logemail && req.body.logpassword){
        User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
            if (error || !user) {
              var err = new Error('Wrong email or password.');
              err.status = 401;
              return next(err);
            } else {
              req.session.userId = user._id;
              console.log("U ar logged in!");
              res.status(200).send("Logged In!");
            }
          });
      }
      else {
          var err = new Error("Please insert the required data inputs");
          res.status(401).send(err);
          
      }
});

// ___________________________________________________ GET Method Routes ____________________________________ //

app.get('/', function(req,res){

<<<<<<< HEAD
<<<<<<< HEAD
    Posts.find({}, function(err,data){
      if(err){
        res.staus(500).send({error : "Unable to get data, an error occured"});
      }else{
        res.send(data);
      }
    });
});

app.delete('/deletePost:objectId', function(req, res){
    /* TODO
    Develop the DELETE method with objecd ID param used
    to delete posts in Database
    */
    
});

app.listen(3000,function(){
   console.log("Hello!");
=======
   	 Posts.find({}, function(err, data){
         if(err){
             res.status(500).send({error:"Could not get data, an error occured"});
         }else{
             res.status(200).send(data);
         }
     });
});

=======
   	 Posts.find({}, function(err, data){
         if(err){
             res.status(500).send({error:"Could not get data, an error occured"});
         }else{
             res.status(200).send(data);
         }
     });
     
});


app.get('/user', function (req, res, next){
    User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send(user);
        }
      }
    });
});

<<<<<<< HEAD

app.get('/logout', function (req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function (err) {
        if (err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  });
// ___________________________________________________ DELETE Method Routes ____________________________________ //

=======
>>>>>>> dee46479df8e2b2e5c705af9766f1a17e1e194c8
>>>>>>> 850c7520c3a72ac804716a07afea7b9db8fa2088
app.delete('/posts/delete:objid', function(req,res){
    var urlParam = req.params.objid;
    Posts.find({ id : urlParam }).remove(function(err, succ){
        if(err){
            res.status(500).send({error:"An error occured, cannot delete post"});
        }else{3000
            res.status(200).send(succ);
        }
    }).exec()           
});

app.listen(3000,function(){
   console.log("Hello!"); 
<<<<<<< HEAD
>>>>>>> dee46479df8e2b2e5c705af9766f1a17e1e194c8
=======
>>>>>>> dee46479df8e2b2e5c705af9766f1a17e1e194c8
});
