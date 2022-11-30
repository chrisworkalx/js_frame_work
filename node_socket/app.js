const express = require('express');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// 监听
io.on('connection', (socket) => {
  console.log('a socket connection....');

  // 事件到达时
  socket.on('chatMsg', (msg) => {
    io.emit('chatMsg', msg);
  });

  // 链接断开时
  socket.on('disconnect', () => {
    console.log('disconnect');
  });
});

http.listen(3000, () => {
  console.log('http listen 3000............');
});
