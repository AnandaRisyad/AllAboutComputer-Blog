var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId

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
        User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
            if (error || !user) {
              var err = new Error('Wrong email or password.');
              err.status = 401;
              return next(err);
            } else {
              req.session.userId = user._id;
              console.log("U ar logged in! id : "+req.session.userId);
              res.status(200).send(req.session.userId)
              
            }
          });
      }
      else {
          var err = new Error("Please insert the required data inputs");
          res.status(401).send(err);
          
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


router.get('/user', function (req, res, next){
    
    var str = req.query.id;

    User.findById(str)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
          if(user === null){
            res.status(401).send({error : "User not found with id : ["+str+"]"});
          }else{
              
              console.log("Success get user profile with id : " + str + " with username : " + user.username);
              return res.send(user);
          }
      }
    });
});


router.get('/logout', function (req, res, next) {
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