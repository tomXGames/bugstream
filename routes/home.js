var express = require('express');
var session = require('express-session');
var router = express.Router();
var streamRouter = require('./stream');


/* GET home page if any user is logged in */
router.get('/', function(req, res, next) {
  if(req.session.user != null){
    res.render('index', {title: 'Home', imagesrc: 'image.jpg', Skills: streamRouter.categories});
  }
  else{
    next();
  }
  }, (req, res) => {
    res.redirect('/login');
  }
);



module.exports = router;
