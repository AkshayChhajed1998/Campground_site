var express=require("express"),
camp=require("../models/campground.js");
var User=require("../models/user.js");
var Comment=require("../models/comment.js");
var router=express.Router();

var isLoggedIn=function(req,res,next)
{
    if(req.isAuthenticated())
    {
     return next();
    }
    req.flash("error","You Need To Login First!!!!");
    res.redirect("/campground/login");
}



router.get("/campground",function(req,res){

    camp.find({},function(err,list){
       if(err)console.log(err);
       else 
    {
            console.log("database read successfully");
            res.render("index",{list:list,user:req.user});
        
    }});
    
});

router.post("/campground",function(req,res){

   if(req.body && req.user)
   {
    req.body.author=req.user;
    var c = new camp(req.body);
    c.save(function(err,saved){

        if(err)console.log(err);
        else
        {
            console.log(saved);
            User.findByIdAndUpdate(req.user.id,{$push:{post:new camp(saved)}},function(err,ssaved)
            {
                if(err)console.log(err);
                else console.log("post linked with User!!!");
            });
        }
            

     });
    res.redirect("/campground");
   }
});


router.get("/campground/new",isLoggedIn,function(req,res){
    res.render("feed",{user:req.user});
});

router.get("/campground/:id",function(req,res){
    camp.findById(req.params.id,function(err,found){
        if(err)console.log(err);
        else
        {
            camp.findOne({_id:found.id}).populate({ 
                path: 'comment',
                populate: {
                            path: 'author',
                            model: 'User'
                        } 
        }).populate("author").exec(function(err,R){
                if(err)console.log(err);
                else
                res.render("show",{found:R,user:req.user});
            });
        }
        
    });
});

router.get("/campground/:id/edit",function(req,res){
    camp.findById(req.params.id,function(err,found){
       if(err)console.log(err);
       else res.render("edit",{found:found,user:req.user});
    });
});

router.put("/campground/:id",function(req,res){
    camp.findByIdAndUpdate(req.params.id,req.body,function(err,found){
       if(err)console.log(err);
       else console.log(found); 
    });
    res.redirect("/campground");
});

router.delete("/campground/:id/delete",function(req,res){
    camp.findByIdAndRemove(req.params.id,function(err,deleted){
       if(err)console.log(err);
       else
       {
        for(var i=0;i<deleted.comment.length;i++)
        {
            Comment.findByIdAndRemove(deleted.comment[i],function(err,deleted){
                    if(err)console.log(err);
                    else console.log(deleted);
            });
        }
        console.log(deleted);
       } 
    });
    res.redirect("/campground")
});


module.exports=router;