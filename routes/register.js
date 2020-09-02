var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var crypto = require('crypto');

router.get('/', function(req, res) {
  res.render('register', {title: 'Home', imagesrc: 'public/images/image'});
});

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

router.post('/', function(req, res) {
  if(req.body.password && req.body.email == req.body.emailconfirm){
    var password = getHashedPassword(req.body.password);
    var sql = "INSERT INTO users(email,password,firstname,secondname) VALUES ?";
    var values = [[req.body.email, password, req.body.firstname, req.body.lastname]];
    con.query(sql, [values])
    res.redirect('/login')
  }
})

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}

module.exports = router;
