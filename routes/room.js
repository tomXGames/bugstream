var express = require('express');
var router = express.Router();
var app = require('../app')
const io = require('socket.io')(app.Server)

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('room')
});

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)
    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

module.exports = router;
