const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const uuid = require('node-uuid');
const sanitizeHtml = require('sanitize-html');


const util = require('util');

const inspect = (o, d = 1) => {
  console.log(util.inspect(o, { colors: true, depth: d }));
  return o;
};

// Socket IO:
const http = require('http');
const server = http.createServer();
const socket_io = require('socket.io');
server.listen(4000);
const io = socket_io();
io.attach(server);

// Helpers

function generateRandomColor() {
  let rand = Math.random();
  let color;
  if (0 <= rand && rand < 0.25) {
    color = 'red';
  } else if (0.25 <= rand && rand < 0.50) {
    color = 'green';
  } else if (0.50 <= rand && rand < 0.75) {
    color = 'blue';
  } else if (0.75 <= rand && rand < 1) {
    color = 'purple';
  }
  return color;
}

function parseMessage (message) {
  var formatted = message;
  var imageFileExtension = /([^\s]+\.(jpg|png|gif))/g;
  return {
    __html: sanitizeHtml(
        formatted.replace(imageFileExtension, (x) => {return '<img src="'+x+'">'}),
        {allowedTags: ['img']}
    )};
}

var userCount = 0;

// Sockets

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  const emitAction = (type, payload) => socket.emit('action', {type, payload});
  const broadcastAction = (type, payload) => io.emit('action', {type, payload});

  userCount += 1;
  io.emit('action', {type: 'USERCOUNT', payload: userCount});

  socket.user = {
    id: socket.id,
    username: "Anonymous",
    color: generateRandomColor()
  };

  socket.on('action', (action) => {
    switch(action.type) {
      case 'server/NEW_MESSAGE':
        let message = {
          id: uuid.v1(),
          username: socket.user.username,
          content: parseMessage(action.payload),
          color: socket.user.color,
          notification: ''
        }
        io.emit('action', {type: 'NEW_MESSAGE',
          payload: message
        });
        break;
      case 'server/SET_USERNAME':
        let notification = `${socket.user.username} has changed their username to ${action.payload.username}`
        socket.user.username = action.payload.username;
        socket.user.color = generateRandomColor();
        io.emit('action', {type: 'NEW_MESSAGE',
          payload: {
            id: uuid.v1(),
            notification: notification
          }
        });
        break;
    }
  });

  socket.on('disconnect', function(){
    userCount -= 1;
    io.emit('action', {type: 'USERCOUNT', payload: userCount});
  });
});

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  })
  .listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Running at http://0.0.0.0:3000');
  });
