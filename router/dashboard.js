var express=require("express");
var router=express.Router();
var User=require("../models/user.js");
var camp=require("../models/campground.js");
var Comment=require("../models/comment.js");


    var isLoggedIn=function(req,res,next)
    {
    if(req.isAuthenticated())
    {
     return next();
    }
    req.flash("error","You Need To Login First!!!!");
    res.redirect("/campground/login");
    }


router.get("/campground/:id/dashboard/:cid/review",function(req,res){
   Comment.findByIdAndUpdate(req.params.cid,{$set:{review:"1"}},function(err,saved){
        if(err)console.log(err);
        else res.redirect("/campground/:id/dashboard/post");
   });
});

router.get("/campground/:id/dashboard/post",function(req,res){
    User.findOne(req.user).populate({path:"post",populate:{path:"comment",model:"comment",populate:{path:"author",model:"User"}}}).populate({path:"comment",populate:{path:"author",model:"User"}}).exec(function(err,ret){
        console.log(ret);
        res.render("dashboard",{user:ret});
    });
});


router.get("/campground/:id/dashboard/comment",function(req,res){
    User.findOne(req.user).populate({path:"post",populate:{path:"comment",model:"comment",populate:{path:"author",model:"User"}}}).populate({path:"comment",populate:{path:"author",model:"User"}}).exec(function(err,ret){
        res.render("dashboardC",{user:ret});
    });
});

module.exports=router;
