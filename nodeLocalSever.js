const WebSocket = require('ws');

const wsV2ray = new WebSocket.Server({ port: 4433 });
const wsFirefox = new WebSocket.Server({ port: 4443 });

wsV2ray.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: V2ray',message);
    wsFirefox.clients.forEach(function each(client) {
   if (client !== ws && client.readyState === WebSocket.OPEN) {
     client.send(message);
   }
 });
  });
});
wsFirefox.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: Firefox',message);
    wsV2ray.clients.forEach(function each(client) {
   if (client !== ws && client.readyState === WebSocket.OPEN) {
     client.send(message);
   }
 });
  });
});
