var express             = require("express"),
    router              = express.Router(),
    passport            = require("passport"),
    User                = require("../models/user");
    
    
router.get("/", function(req, res){
    res.render("landing");
});

// Show register form
router.get("/register", function(req, res){
    res.render("register");
});
// Handle sign-up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, comment){
           if(err){
               console.log(err);
                res.render("register");
           }
           passport.authenticate("local")(req, res, function(){
               res.redirect("/campgrounds");
           });
        });
});

// Show login form
router.get("/login", function(req, res){
    res.render("login");
});
// Handle login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
        // Doing nothing for now
    }
);

// Add log-out route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

// middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;
