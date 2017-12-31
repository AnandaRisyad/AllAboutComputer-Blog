
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var UserSchema = new Schema({
    username : { type:String, required:true, minlength : 3, unique:true },
    realname : { type:String, required:true },
    email : { type : String, required:true, unique:true },
    phone : { type : Number, required:true, minlength : 5},
    password : { type:String, required:true, minlength: 6 },
    dob : { type:Date },
    joined : { type:Date, default:Date.now() },
    about : {
        address : { type:String },
        image : { type:String },
        age:    { type:Number },
        likes:  { type:Number, default:0},
        followers:  [{ type:ObjectId, default:null}],
        follows:    [{ type:ObjectId, default:null }],
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
    }
});

//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({ email: email })
      .exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
}



//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  });



var User = mongoose.model('users', UserSchema);
module.exports = User;
