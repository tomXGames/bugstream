var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var mysql = require('mysql');
var session = require('../app.js').session;

var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  schema:   'users',
  database: 'users'
});

con.connect(function(err) {
  if (err) throw err;
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login', {title: 'Login', imagesrc: 'public/images/image'});
});

router.post('/', (req, res) => {
  const hashedPassword = getHashedPassword(req.body.password);
  user = con.query("SELECT * FROM users WHERE email = ? ", req.body.username, function (err, results) {
    if (err) throw err;
    else if(results[0].password == hashedPassword){
      req.session.user = req.body.username;
      console.log(`${req.body.username} logged in!`)
      res.redirect('/');
    }
  }); 
});

const getHashedPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('base64');
}

module.exports = router;
