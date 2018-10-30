const express = require('express');
const app = express();

const mongoose = require('mongoose');
//in reality we should write a config to connect db
mongoose.connect("mongodb://user:user@ds143778.mlab.com:43778/coj_zxy");const restRouter = require('./routes/rest');
const indexRouter = require('./routes/index');

const path = require('path');
//__dirname stores the path to the project directory server
app.use(express.static(path.join(__dirname, '../public/')));
app.use('/', indexRouter);
app.use('/api/v1', restRouter);
//forward all unhandled url request to client-siede routing
app.use(function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../public')});
});

const http = require('http');
const socketIO = require('socket.io');
const io = socketIO();
const editorSocketService = require('./services/editorSocketService.js')(io);

const server = http.createServer(app);
io.attach(server);
server.listen(3000);
server.on('error', onError);
server.on('listening', function() {
  console.log('listening to ' + server.address().port);
});


function onError(error) {
  console.log(error);
  throw error;
}
