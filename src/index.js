import { initMongoDB } from './db/initMongoDB.js';
import { setupServer } from './server.js';


const bootstrap = async () => {
  await initMongoConnection();
  startServer();
};

bootstrap();
