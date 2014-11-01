var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: "CMU's Block Trader" });
});

router.get('/newuser',function(req,res){
    res.render('newuser',{title: 'Add new user'})
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

router.post('/adduser',function(req,res){
    var db = req.db;

    var userName = req.body.username;
    var userLocation = req.body.userlocation;

    var users = db.get("users");

    var timeUserWaits = req.body.timetoeat;

    users.insert({
        "username": userName,
        "userlocation": userLocation,   
        "timeuserwaits": timeUserWaits
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

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

module.exports = router;


