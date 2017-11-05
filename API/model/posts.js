var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var posts = new Schema ({
    title : { type:String, default:"My Posts" },
    date : { type:Date, default: Date.now(); },
    tag : [{ type:String, required:false }],
    people : [{ type:ObjectId, ref:"Users" }]
});