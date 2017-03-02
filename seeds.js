var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");

var samples = [
    {
        name: "Sunset Cove",
        img: "https://farm4.staticflickr.com/3008/2618694153_e64abd1e56.jpg",
        description: "Enjoy a nice sunset and silhouettes of trees! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit posuere orci, ac venenatis mauris elementum a. Nulla sed enim vitae leo eleifend egestas at quis mi. Sed eu leo a lorem egestas fringilla. In condimentum dictum ultrices. Pellentesque posuere orci erat, sed vestibulum nunc fermentum volutpat. Nulla sed ultrices eros, nec iaculis justo. Phasellus vestibulum tempus vehicula. In pellentesque, mi eget volutpat accumsan, turpis neque placerat justo, vel venenatis ex velit ac eros. Duis condimentum fermentum risus eu elementum. Etiam vitae est mauris. Etiam gravida urna eu molestie maximus. Morbi ut viverra dui. Vivamus in lorem sed nisl dictum rhoncus et ut odio. Nulla nunc leo, interdum nec suscipit et, efficitur vel eros. Vivamus feugiat magna nec pharetra rutrum."
    },
    {
        name: "Cloud's Rest",
        img: "https://farm6.staticflickr.com/5100/5426373830_ceebc9f2f1.jpg",
        description: "Have you ever dreamt of sleeping amongst clouds? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit posuere orci, ac venenatis mauris elementum a. Nulla sed enim vitae leo eleifend egestas at quis mi. Sed eu leo a lorem egestas fringilla. In condimentum dictum ultrices. Pellentesque posuere orci erat, sed vestibulum nunc fermentum volutpat. Nulla sed ultrices eros, nec iaculis justo. Phasellus vestibulum tempus vehicula. In pellentesque, mi eget volutpat accumsan, turpis neque placerat justo, vel venenatis ex velit ac eros. Duis condimentum fermentum risus eu elementum. Etiam vitae est mauris. Etiam gravida urna eu molestie maximus. Morbi ut viverra dui. Vivamus in lorem sed nisl dictum rhoncus et ut odio. Nulla nunc leo, interdum nec suscipit et, efficitur vel eros. Vivamus feugiat magna nec pharetra rutrum."
    },
    {
        name: "Evergreen Lane",
        img: "https://farm8.staticflickr.com/7480/15744339048_1760eb3800.jpg",
        description: "Get lost in a forest filled with tens of thousands of tall pines! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit posuere orci, ac venenatis mauris elementum a. Nulla sed enim vitae leo eleifend egestas at quis mi. Sed eu leo a lorem egestas fringilla. In condimentum dictum ultrices. Pellentesque posuere orci erat, sed vestibulum nunc fermentum volutpat. Nulla sed ultrices eros, nec iaculis justo. Phasellus vestibulum tempus vehicula. In pellentesque, mi eget volutpat accumsan, turpis neque placerat justo, vel venenatis ex velit ac eros. Duis condimentum fermentum risus eu elementum. Etiam vitae est mauris. Etiam gravida urna eu molestie maximus. Morbi ut viverra dui. Vivamus in lorem sed nisl dictum rhoncus et ut odio. Nulla nunc leo, interdum nec suscipit et, efficitur vel eros. Vivamus feugiat magna nec pharetra rutrum."
    }
]

function seedDB() {
    Campground.remove({}, function(err){
        if(err) {
            console.log(err);
        } else {
            console.log("Removed all campgrounds!");
            // samples.forEach(function(seed){
            //     Campground.create(seed, function(err, campground){
            //         if(err) {
            //             console.log(err);
            //         } else {
            //             console.log("Added a campground!");
            //             Comment.create(
            //                 {
            //                     text: "Gorgeous views, but sadly there was no wi-fi.",
            //                     author: "Joe"
            //                 }, function(err, comment){
            //                     if(err) {
            //                         console.log(err);
            //                     } else {
            //                         campground.comments.push(comment);
            //                         campground.save();
            //                         console.log("Created new comment");
            //                     }
            //             });
            //         }
            //     });
            // });
        }
    });
}

module.exports = seedDB;