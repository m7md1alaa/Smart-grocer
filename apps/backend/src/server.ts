import { createApp } from './app';
import { config } from './config/environment';
import http from 'http';

const app = createApp();

const PORT = config.port;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { server };
