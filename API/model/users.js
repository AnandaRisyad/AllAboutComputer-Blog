var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var users = new Schema ({
    name:   String,
    username:   { type:String, lowercase:true },
    id : 
    age:    { type:Number },
    likes:  { type:Number, default:0},
    followers:  { type:String, default:null},
    follows:    { type:String, default:null },
    posts:      { type:Number, default:0 },
    bio:    { type:String, required:false },
    website:    {type:String, required:false},
    device : {
        pc:     { type:String, default:"Don't have PC's" },
        phones: { type:String, default:"Don't use Phones" }
    },
    
    hobby:  { type:String, default:"I Don't Know" },
    programmer:     {type:Boolean, required:false},
    job:    {type:String, required:false}
})

module.exports = mongoose.model('Users', users);