var mongoose = require("mongoose");

var PLM = require("passport-local-mongoose");


var user=new mongoose.Schema({
	

								username:String,
								password:String,
								post:[{type:mongoose.Schema.ObjectId,ref:"camp"}],
								comment:[{type:mongoose.Schema.ObjectId,ref:"comment"}],
								profile:{data:Buffer,contentType:String}
});

user.plugin(PLM);

module.exports = mongoose.model("User",user);



