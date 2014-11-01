var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: "CMU's Block Trader" });
});

router.get('/newuser',function(req,res){
    res.render('newuser',{title: 'Add new user'});
});

router.get('/newpost',function(req,res){
    res.render('newpost',{title: 'Add new post'});
});

router.get('/userlist',function(req,res){
    var db = req.db;
    var collection = db.get('users');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

// http://stackoverflow.com/questions/7990890/how-to-implement-login-auth-in-node-js
// based on that
// doesnt work as req.session is undefined

function checkAuth(req, res, next) {
  if (req.session.user_id) {
    res.send('You are not authorized to view this page');
  } else {
    next();
  }
}

router.get('/userloggedinpage', checkAuth, function (req, res) {
  res.send('if you are viewing this page it means you are logged in');
});

router.get('/loginpage', function (req, res) {
  res.render('loginpage',{title: 'User login'});
});

router.post('/login', function (req, res) {
  var post = req.body;
  if (post.username === 'john' && post.userpassword === 'johnspassword') {
    req.session.user_id = 10; // random
    res.location('userloggedinpage');
    res.redirect('/userloggedinpage');
  } else {
    res.send('Bad user/pass');
  }
});

router.get('/logout', function (req, res) {
  delete req.session.user_id;
  res.redirect('/login');
});  

router.post('/addpost',function(req, res){
    var db = req.db;
    var userName = req.body.username;
    var userLocation = req.body.userlocation;
    var userEmail = req.body.useremail;
    var posts = db.get("posts");
    var timeUserWaits = req.body.timetoeat;

    posts.insert({
        "username": userName,
        "userlocation": userLocation,   
        "timeuserwaits": timeUserWaits,
        "useremail": userEmail
    },function(err,doc){
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

router.post('/adduser',function(req,res){
    var db = req.db;
    var userName = req.body.username;
    var userLocation = req.body.userlocation;
    var userEmail = req.body.useremail;
    var users = db.get("users");
    var timeUserWaits = req.body.timetoeat;

    users.insert({
        "username": userName,
        "userlocation": userLocation,   
        "timeuserwaits": timeUserWaits,
        "useremail": userEmail
    },function(err,doc){
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });


});

module.exports = router;

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});




