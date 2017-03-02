var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
    res.render("landing");
});

//AUTH ROUTES

//1. Register

router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user){
        if (err) {
            req.flash("error", err.message + ".");
            return res.redirect("/register");
        } passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp, " + user.username + "!");
            res.redirect("/campgrounds");
        })
    });
});

//2. Login

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", 
    {   successFlash: "Welcome back to YelpCamp!",
        successRedirect: "/campgrounds",
        failureFlash: "Invalid username or password.",
        failureRedirect: "/login"
    }), function(req, res){
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You have been logged out.");
    res.redirect("/campgrounds");
});

module.exports = router;