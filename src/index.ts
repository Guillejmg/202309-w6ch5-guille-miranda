import { createServer} from 'http'
import 'dotenv/config'


const PORT = process.env.PORT || 3030;

const server = createServer((req, res)=>{

  const url = new URL(req.url as string, `http://${req.headers.host}`);

  res.setHeader('Content-type', 'text/html');
  res.write('<h1>Knowledge</h1>');

  if (url.pathname.toLowerCase() === '/knowledge') {
    res.write('<h2>List of Knowledge</h2>');
  } else {
    server.emit('error', new Error ('not today'));
  }

  res.end();

})

server.listen(PORT);

server.on('error', (error) => {
  console.log(error.message);
});
