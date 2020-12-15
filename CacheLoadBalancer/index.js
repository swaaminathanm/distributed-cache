require("dotenv").config();
const http = require("http");
const assignServerHash = require("./assignServerHash");
const hash = require("./hash");
const findServer = require("./findServer");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';
const SERVERS = process.env.CACHE_SERVERS ? process.env.CACHE_SERVERS.split(' ') : [];

if (SERVERS.length <= 0) {
  throw new Error("Fatal: No cache servers configured");
}

const serverAndHashMap = assignServerHash(SERVERS);

const put = async (payload) => {
  const { key, value } = payload;
  const server = findServer(serverAndHashMap, hash(key));
  console.log(server);
}

const get = async (key) => {
  const server = findServer(serverAndHashMap, hash(key));
  console.log(server);
}

const server = http.createServer(async (request, response) => {
  if (request.method === 'POST') {
    let body = ''
    request.on('data', (data) => body += data);
    request.on('end', async () => {
      try {
        await put(JSON.parse(body));
        response.writeHead(200, {'Content-Type': 'text/json'});
        response.end(JSON.stringify({ message: "success" }));
      } catch (error) {
        response.writeHead(500, {'Content-Type': 'text/json'});
        response.end(JSON.stringify({ message: "failure", error }));
      }
    });
  } else {
    const key = request.url.split("/")[1];
    try {
      const value = await get(key);
      response.writeHead(200, {'Content-Type': 'text/json'})
      response.end(JSON.stringify({ message: "success", value }));
    } catch (error) {
      response.writeHead(500, {'Content-Type': 'text/json'});
      response.end(JSON.stringify({ message: "failure", error }));
    }
  }
});

server.listen(PORT, HOST)
console.log(`Listening at http://${HOST}:${PORT}`)