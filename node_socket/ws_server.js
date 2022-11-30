const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
    // message = typeof message === 'string' ? message : JSON.stringify(message);
    setTimeout(() => {
      message = message.toString('utf8');
      const dataMsg = JSON.stringify({
        msg: message,
        eventType: 3,
        id: Date.now()
      });
      ws.send(dataMsg);
    }, 50);
  });
  ws.on('open', () => {
    console.log('ws:open');
  });
  const data = JSON.stringify({
    msg: '哈喽websocket',
    eventType: 3,
    id: Date.now()
  });
  ws.send(data);
  setInterval(() => {
    ws.send(
      JSON.stringify({
        msg: `${Math.random().toFixed(4)}`,
        eventType: 3,
        id: Date.now()
      })
    );
  }, 1000 * 60 * 2);
});
