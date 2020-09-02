var express = require('express');
var session = require('express-session');
var router = express.Router();
var app = require('../app.js')
const io = require('socket.io')(app.Server)

router.categories = ['python', 'nodejs'] 
router.categories.forEach(element => {
  eval(`${element} = new Array()`)
});

router.post('/', (req, res) => {
    console.log(req.body.dropDown)
    eval(`var streamnum = ${req.body.dropDown}.length+1`)
    streamobject = {name: req.session.name, num: streamnum}
    res.redirect(`/${req.body.dropDown}/${streamnum}`)
    eval(`${req.body.dropDown}.push(streamobject)`)
})

module.exports = router;
