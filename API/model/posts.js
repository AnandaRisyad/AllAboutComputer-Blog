var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var posts = new Schema ({
    title : { type:String, default:"My Posts" },
    author : {type:String, required:true},
    topic : { type:String, required:true },
    date : { type:Date, default: Date.now() },
    tag : [{ type:String, required:false }],
    people : [{ type:ObjectId, ref:"Users", required:false }],

    content: {
        files : [ { type:String, required:false } ], //Store a links, the file is in the server storage
        image : [ { type:String, required:false } ], //Store a links, image will be in the server storage
        videos : [ { type:String, required:false } ], //Links to a video file in server storage

        text : { type:String, required:true }
    }

});




module.exports = mongoose.model('Posts', posts);