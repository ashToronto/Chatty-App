// server.js
const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({
  server
});

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
wss.on('connection', (ws) => {
  console.log('User connected');
  count = {
    type: "clientSize",
    clientSize: wss.clients.size
  }
  wss.clients.forEach(client => {
    client.send(JSON.stringify(count))
  });
  console.log(count)
  // Broadcasts back 'message' with added id property
  ws.on('message', message => {
    let outgoingMsg = JSON.parse(message)
    outgoingMsg.id = uuidv4()
    console.log('outgoing broadcast', outgoingMsg)
    wss.broadcast(JSON.stringify(outgoingMsg));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    count = {
      type: "clientSize",
      clientSize: wss.clients.size
    }
    wss.clients.forEach(client => {
      client.send(JSON.stringify(count))
    });
  });
});

// http://localhost:3001 For this Server
// http://localhost:3000 for React
