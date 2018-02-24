var mongoose = require('mongoose');
var User = require("./../model/user");

module.exports.profile = function(req, res){
    // If no ID found in database
    if (!req.body._id){
        res.status(401).json({
            "message":"Unauthorized account"
        });

    } else {
        User
        .findById(req.body._id)
        .exec(function(err, user){
            res.status(200).json(user);
        });
    }
}