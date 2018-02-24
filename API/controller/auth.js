var passport = require('passport');
var mongoose = require('mongoose');
var User = require('./../model/user');

module.exports.register = function(req ,res){
    var user = new User();

    user.username = req.body.username;
    user.email = req.body.email;
    user.phone = req.body.phone;

    user.setPassword(req.body.password);

    user.save(function(err){
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token":token
        });
    });

}

module.exports.login = function(req, res){
    var user = new User();
    user.email = req.body.logemail
    user.password = req.body.logpassword
    
    user.authenticate(req.body.logemail, req.body.logpassword, function(empty, User){
        var _id = User._id
        var expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
      
        return jwt.sign({
          _id: User._id,
          email: User.email,
          name: User.name,
          exp: parseInt(expiry.getTime() / 1000),
        }, "MY_SECRET");
        res.status(200);
        res.json({
            "token":token
        });
    })
}