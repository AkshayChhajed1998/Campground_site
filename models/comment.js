var mongoose=require("mongoose");

var comment=new mongoose.Schema({
	
									value:String,
									created:{type:Date,default:Date.now},
									review:{type:String,default:"0"},
									author:{type:mongoose.Schema.ObjectId,ref:"User"}
												


								});


module.exports = mongoose.model("comment",comment);