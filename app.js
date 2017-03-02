var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    flash                   = require("connect-flash"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    methodOverride          = require("method-override"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    Campground              = require("./models/campground"),
    Comment                 = require("./models/comment"),
    User                    = require("./models/user"),
    seedDB                  = require("./seeds");

var campgroundRoutes    = require("./routes/campgrounds"),
    commentRoutes       = require("./routes/comments"),
    indexRoutes         = require("./routes/index");
    

mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://masterQ:QC8520qc@ds113630.mlab.com:13630/yelpcamp");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); //safer than using just "public" since we target the directory that script is in (v5) and go to public from there
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret:"This could be anything",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
});