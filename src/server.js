const express = require('express');
const socketIo = require('socket.io');
const path = require('path');

const rabbitConsumer = require('./rabbitConsumer');

const app = express();
const server = require('http').createServer(app);
const io = new socketIo.Server(server);

app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
  res.render('index.html');
});

const socket = io.on('connection', (socket) => {
  console.log(`User Socket Connected: ${socket.id}`);
  rabbitConsumer(socket);
  socket.on('disconnect', () =>
    console.log(`User disconnected: ${socket.id} `)
  );
});

server.listen(3001, () => {
  console.log('Server listening on port 3001');
});

module.exports = socket;
