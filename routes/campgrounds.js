var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var geocoder = require("geocoder");


//INDEX - Show all campgrounds:
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log("Error!! Campgrounds not found! More info: " + err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

//NEW - Form to create campground:
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//CREATE - Post new campground:
router.post("/", middleware.isLoggedIn, function(req, res){
    var newName = req.body.name;
    var newImg = req.body.image;
    var newDesc = req.body.desc;
    var newCost = req.body.cost;
    var newAddr = req.body.address;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: newName, img: newImg, address: newAddr, description: newDesc, author: author, cost: newCost};
    Campground.create(newCampground, function(err, newlyAdded){
        if (err) {
            console.log("Error!! New campground could not be added! More info: " + err);
        } else {
            req.flash("success", "New campground posted!");
            res.redirect("/campgrounds");
        }
    });
});


//SHOW - More info on selected campground:
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, campFound){
        if (err) {
            console.log("Error! Could not find campground by id! More details: " + err);
        } else {
            geocoder.geocode(campFound.address, function(err, campCode){
                if (err) {
                    console.log(err);
                } else {
                    res.render("campgrounds/show", {campground: campFound, campLat: campCode.results[0].geometry.location.lat, campLng: campCode.results[0].geometry.location.lng});
                }
            });
        }
    });
});

//EDIT - Retrieve and edit an existing campground:
router.get("/:id/edit", middleware.userCampAuthorize, function(req, res){
    Campground.findById(req.params.id, function(err, campFound){
        if (err) {
            req.flash("error", "Could not retrieve the requested campground.");
        } else {
        res.render("campgrounds/edit", {campground: campFound});
        }
    })
});

//UPDATE - Put edited version of campground back into database
router.put("/:id", middleware.userCampAuthorize, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
        if (err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Changes to campground saved!");
            res.redirect("/campgrounds/" + updatedCamp._id);
        }
    })
});

//DESTROY - Delete a targeted campground
router.delete("/:id", middleware.userCampAuthorize, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground has been deleted.");
            res.redirect("/campgrounds");
        }
    });
}); 

module.exports = router;