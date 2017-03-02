var Comment = require("../models/comment");
var Campground = require("../models/campground");

var middlewareObj = {}

middlewareObj.isLoggedIn = function (req, res, next){
    if (req.isAuthenticated()){
        return next();
    } 
    req.flash("error", "You have to be logged in to do that.");
    res.redirect("/login");
}

middlewareObj.userCommentAuthorize = function(req, res, next){
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, commentFound){
            if (err) {
                console.log(err);
                req.flash("error", "Your request could not be fulfilled.")
                res.redirect("back");
            } else {
                if (commentFound.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You do not have permission to do that.")
                    res.redirect("back");
                }
            }
        }); 
    } else {
        req.flash("error", "You have to be logged in to do that.");
        res.redirect("/login");
    }
}

middlewareObj.userCampAuthorize = function(req, res, next){
    //is user logged in?
    if (req.isAuthenticated()){
         Campground.findById(req.params.id, function(err, campFound){
            if (err){
                req.flash("error", "The requested campground could not be found.")
                res.redirect("back");
            } else {
                //is user the author of target campground?
                if (campFound.author.id.equals(req.user._id)) {
                    //Yes, proceed
                    next();
                } else {
                    //No, go back
                    req.flash("error", "You do not have permission to do that.")
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You have to be logged in to do that.");
        res.redirect("/login");
    }
}

module.exports = middlewareObj;