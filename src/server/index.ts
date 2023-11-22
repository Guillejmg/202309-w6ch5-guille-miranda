import { createServer} from 'http'
import { app } from './app.js';
import createDebug from 'debug';
import { dbConnect } from '../services/db.connect.js';


const debug = createDebug('W7E:index')

const PORT = process.env.PORT || 3030;

const server = createServer(app);
debug('starting server');

dbConnect()
.then((mongoose) => {
  server.listen(PORT);
  debug('Connected to DB:', mongoose.connection.db.databaseName)
  }).catch((error)=>server.emit(error))

server.listen(PORT);

server.on('listening', () => {
  console.log('listening. on port', PORT);
  debug('listening. on port', PORT);
})

server.on('error', (error) => {
  debug(`Error ${error.message}`);
});
