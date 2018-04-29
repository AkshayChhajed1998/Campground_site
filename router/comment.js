var express=require("express");
var router=express.Router();
var camp=require("../models/campground.js");
var User=require("../models/user.js");
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


router.get("/campground/:id/comment/new",isLoggedIn,function(req,res){
    camp.findById(req.params.id,function(err,found){
        res.render("newcomment",{found:found,user:req.user});
    });
});

router.post("/campground/:id/comment",function(req,res){
    var comment = new Comment(req.body);
    comment.author=req.user;
    comment.save(function(err,saved){
        if(err)console.log(err);
        else
        {
         console.log(saved);
         User.findByIdAndUpdate(req.user.id,{$push:{comment:new Comment(saved)}},function(err,ssaved){
            if(err)console.log(err);
            else console.log("comment linked with User!!");
         });
         camp.findByIdAndUpdate({_id:req.params.id},{$push:{comment:new Comment(saved)}},function(err,ret){
            if(err)console.log(err);
            else console.log("comment linked with campground!!")
        });
         res.redirect("/campground/"+req.params.id);
        }

    });
});

router.delete("/campground/:id/comment/:commentid/delete",function(req,res){
    Comment.findByIdAndRemove(req.params.commentid,function(err,rem){
       camp.findById(req.params.id,function(err,found){
            found.comment.splice(found.comment.indexOf(rem.id),1);
            req.user.comment.splice(req.user.comment.indexOf(rem.id),1);
            camp.findByIdAndUpdate(found.id,found,function(err,r){
                if(err)console.log(err);
            });
            User.findByIdAndUpdate(req.user.id,req.user,function()
            {
                if(err)console.log(err);
                else{
                  req.flash("success","Deletion Successfull!!!");
                 res.redirect("/campground/"+req.params.id);}
            });
       });
    });
});


module.exports=router;