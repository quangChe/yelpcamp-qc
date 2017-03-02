var express     = require("express");
var router      = express.Router({mergeParams: true});
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");
var middleware  = require("../middleware");

//NEW - Form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campFound){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campFound});
        }
    });
});

//CREATE - Post new comment
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campFound){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Comment could not be submitted.");
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campFound.comments.push(comment);
                    campFound.save();
                    req.flash("success", "New comment posted!");
                    res.redirect("/campgrounds/" + campFound._id);
                }
            });
        }
    });
});

//EDIT - Edit existing comment
router.get("/:comment_id/edit", middleware.userCommentAuthorize, function(req, res){
    Comment.findById(req.params.comment_id, function(err, commentFound){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: commentFound});
        }
    });
});

//UPDATE - Put edited comment back to replace existing comment
router.put("/:comment_id", middleware.userCommentAuthorize, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, newComment){
        if (err){
            console.log(err);
            req.flash("error", "Changes could not be saved.");
            res.redirect("back");
        } else {
            req.flash("success", "Changes to comment saved!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY - Delete a targeted comment
router.delete("/:comment_id", middleware.userCommentAuthorize, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            req.flash("success", "Comment has been deleted.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;