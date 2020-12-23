require("dotenv").config();
const http = require("http");
const getCacheServerNodes = require("./getCacheServerNodes");
const { cryptoHash: hash } = require("./hash");
const findNode = require("./findNode");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";
const WEIGHT = process.env.WEIGHT || 10;
const SERVERS = process.env.CACHE_SERVERS
  ? process.env.CACHE_SERVERS.split(" ")
  : [];

if (SERVERS.length <= 0) {
  throw new Error("Fatal: No cache servers configured");
}

const nodes = getCacheServerNodes(SERVERS, WEIGHT);

const put = async (payload) => {
  const { key } = payload;
  const node = findNode(nodes, hash(key));
  console.log(node.domain);
};

const get = async (key) => {
  const node = findNode(nodes, hash(key));
  console.log(node.domain);
};

const server = http.createServer(async (request, response) => {
  if (request.method === "POST") {
    let body = "";
    request.on("data", (data) => (body += data));
    request.on("end", async () => {
      try {
        await put(JSON.parse(body));
        response.writeHead(200, { "Content-Type": "text/json" });
        response.end(JSON.stringify({ message: "success" }));
      } catch (error) {
        response.writeHead(500, { "Content-Type": "text/json" });
        response.end(JSON.stringify({ message: "failure", error }));
      }
    });
  } else {
    const key = request.url.split("/")[1];
    try {
      const value = await get(key);
      response.writeHead(200, { "Content-Type": "text/json" });
      response.end(JSON.stringify({ message: "success", value }));
    } catch (error) {
      response.writeHead(500, { "Content-Type": "text/json" });
      response.end(JSON.stringify({ message: "failure", error }));
    }
  }
});

server.listen(PORT, HOST);
console.log(`Listening at http://${HOST}:${PORT}`);
