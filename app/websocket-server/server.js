const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
  console.log('New client connected');

  // Отправка объекта в виде JSON
  ws.send(JSON.stringify({ message: 'Welcome to WebSocket server!' }));

  // Обработка сообщений от клиента
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send(JSON.stringify({ response: `You said: ${message}` }));
  });

  // Обработка закрытия соединения
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://192.168.1.173:8080');
