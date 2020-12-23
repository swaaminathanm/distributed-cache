const http = require("http");
const LRUCache = require("./LRUCache");

const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";
const CACHE_SIZE = process.env.CACHE_SIZE || 1000000;
const lruCache = LRUCache(CACHE_SIZE);

const handlePut = (data = {}) => {
  const key = data.key;
  const value = data.value;

  if (!key || !value) {
    throw new Error("Format not proper.");
  } else {
    lruCache.put(key, value);
  }
};

const handleGet = (key) => {
  if (!key) {
    throw new Error("Format not proper.");
  } else {
    return lruCache.get(key);
  }
};

const server = http.createServer(async (request, response) => {
  if (request.method === "POST") {
    let body = "";
    request.on("data", (data) => (body += data));
    request.on("end", async () => {
      try {
        await handlePut(JSON.parse(body));
        response.writeHead(200, { "Content-Type": "text/json" });
        response.end(JSON.stringify({ type: "success" }));
      } catch (error) {
        response.writeHead(500, { "Content-Type": "text/json" });
        response.end(
          JSON.stringify({ type: "failure", message: error.message })
        );
      }
    });
  } else {
    const key = request.url.split("/")[1];
    try {
      const value = await handleGet(key);
      response.writeHead(200, { "Content-Type": "text/json" });
      response.end(JSON.stringify({ type: "success", value }));
    } catch (error) {
      response.writeHead(500, { "Content-Type": "text/json" });
      response.end(JSON.stringify({ type: "failure", message: error.message }));
    }
  }
});

server.listen(PORT, HOSTNAME);
console.log(`Listening at http://${HOSTNAME}:${PORT}`);
