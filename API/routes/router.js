var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var ctrlProfile = require('./../controller/profile');
var Auth = require("./../controller/auth");

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

//Import Schemas
var User = require('./../model/user');
var Posts = require('./../model/posts');



// ___________________________________________________ POST Method Routes ____________________________________ //



router.post('/', function(req,res){
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

router.post('/auth', function (req, res, next){
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
        Auth.login(req, res);
      }
});

// ___________________________________________________ GET Method Routes ____________________________________ //

router.get('/', function(req,res){

    Posts.find({}, function(err,data){
      if(err){
        res.status(500).send({error : "Unable to get data, an error occured"});
      }else{
        res.send(data);
      }
    });
});

router.get('/user', auth, function(req, res, next){
  ctrlProfile.profile(req,res);
});



router.get('/logout', auth,function (req, res, next) {
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


router.delete('/posts/delete:objid', function(req,res){
    var urlParam = req.params.objid;
    Posts.find({ id : urlParam }).remove(function(err, succ){
        if(err){
            res.status(500).send({error:"An error occured, cannot delete post"});
        }else{3000
            res.status(200).send(succ);
        }
    }).exec()           
});


// ___________________________________________________ PUT Method Routes ______________________________________ //

router.post('/profile', function(req, res, next){

  var Data = {
    username : req.body.username,
    realname : req.body.realname,
    dob : req.body.dob,
    about : {
      address : req.body.about.address,
      image : req.body.about.image,
      age : req.body.about.age,
      bio : req.body.about.bio,
      website : req.body.about.website,
      device : {
        pc : req.body.about.device.pc,
        phones : req.body.about.device.phone
      },
      hobby : req.body.about.hobby,
      programmer : req.body.about.programmer,
      job : req.body.about.job
    }
  }

  User.findByIdAndUpdate(req.body._id, Data, function(err, success){
    if (err){
      console.log("Error, cannot update profile "+err);
      res.status(500).send(Error("Error! Cannot update user profile, err : "+err));
    }else{
      res.status(200).send("Success update user profile");
    }


  });
});

module.exports = router;