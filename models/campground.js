var mongoose=require("mongoose")


var campSchema=new mongoose.Schema({

					name:String,
					image:String,
					detail:String,
					cost:String,
					comment:[{type:mongoose.Schema.ObjectId,ref:"comment"}],
					author:{type:mongoose.Schema.ObjectId,ref:"User"}
								  });


module.exports=mongoose.model("camp",campSchema);