var mongoose=require("mongoose");

var image=new mongoose.Schema({
	
	data:Buffer,
	contentType:String
});

module.exports=mongoose.model("image",image);