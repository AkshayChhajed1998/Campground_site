var express=require("express"),
    router=express.Router(),
    User=require("../models/user.js"),
     passport=require("passport");

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

router.get("/campground/login",function(req,res){
    res.render("login",{user:req.user});
});

router.get("/campground/signup",function(req,res){
    res.render("signup",{user:req.user});
});

router.get("/campground/dashboard/:id/profile",function(req,res){
   res.contentType=req.user.profile.contentType;
   res.send(req.user.profile.data);
});

router.post("/campground/signup/feed",function(req,res){
    User.register({username:req.body.username},req.body.password,function(err,user){
        if(err){
            console.log(err);
            req.flash("error",err.message)
            res.redirect("/campground/signup");
        }
        else
        {
        passport.authenticate("local")(req,res,function(err,saved){
            var A=new image;
            A.data=fs.readFileSync(req.body.profile);
            A.contentType="image/jpg";
            User.findByIdAndUpdate(req.user.id,{$set:{profile:new image(A)}},function(err,saved){
           if(err)console.log(err);
           else 
            {
                console.log(saved);
                req.flash("success",saved.username + " Your SIGNUP was Successfull!!!")
                res.redirect("/campground");
            }
        });
        });
    }
    });

});

router.post("/campground/login/auth",passport.authenticate("local",{successRedirect:"/campground",failureRedirect:"/campground/signup",}),function(req,res){});

router.get("/campground/logout",function(req,res){
    req.logout();
    req.flash("success","You Logged Out SuccessFully!!!");
    res.redirect("/campground");
});

router.get("/",function(req,res){
     res.render("LandingPage");
    //res.redirect("/campground");
});

module.exports=router;