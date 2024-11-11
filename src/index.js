import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();


// import { initMongoConnection } from './db/initMongoConnection.js';
// import { startServer } from './server.js';


// const bootstrap = async () => {
//   await initMongoConnection();
//   startServer();
// };

// bootstrap();
