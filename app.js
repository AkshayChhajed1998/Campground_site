var express			=	require("express"),
    bodyParser		=	require("body-parser"),
    passport		=	require("passport"),
    LocalStrategy	=	require("passport-local"),
    PLM	            = 	require("passport-local-mongoose"),
    mongoose 		=	require("mongoose"),
    camp 			=	require("./models/campground.js"),
    Comment         =   require("./models/comment.js"),
    User            =   require("./models/user.js"),
    fs              =   require("fs"),
    image           =   require("./models/image.js"),
    methodoverride  =   require("method-override"),
    flash           =   require("connect-flash"),
    camprouter      =   require("./router/campground.js");
    authrouter      =   require("./router/auth.js"),
    commentrouter   =   require("./router/comment.js"),
    dashboardrouter =   require("./router/dashboard.js");

var app				=	express();

mongoose.connect("mongodb://localhost/Yelp_Camp",{useMongoClient:true});
mongoose.Promise=global.Promise;


app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret:"I Have here for about 1000yrs month days hrs min sec",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(flash());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(express.static("./public"));
app.use(methodoverride("_method"));


app.locals.scripts = [];
app.locals.addScripts=function (all) {
app.locals.scripts = [];
    if (all != undefined) {
        app.locals.scripts =  all.map(function(script) {
            console.log(script);
            return "<script src=\"" + script + "\"></script>";
        }).join('\n ');
    }

};
app.locals.getScripts = function(req, res) {
    return app.locals.scripts;
};

app.use(function(req,res,next){
    app.locals.meser=req.flash("error");
    app.locals.messu=req.flash("success");
    next();
})

//MiddleWare

var isLoggedIn=function(req,res,next)
{
    if(req.isAuthenticated())
    {
     return next();
    }
    req.flash("error","You Need To Login First!!!!");
    res.redirect("/campground/login");
}


//Routes

app.use(dashboardrouter);

app.use(authrouter);

app.use(camprouter);

app.use(commentrouter);

app.listen(3080,"localhost",function(){console.log("listining")});