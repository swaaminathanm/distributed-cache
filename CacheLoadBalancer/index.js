require("dotenv").config();
const http = require("http");
const getCacheServerNodes = require("./getCacheServerNodes");
const { cryptoHash: hash } = require("./hash");
const findNode = require("./findNode");
const requester = require("./requestor");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOSTNAME || "127.0.0.1";
const WEIGHT = process.env.WEIGHT || 10;
const SERVERS = process.env.CACHE_SERVERS
  ? process.env.CACHE_SERVERS.split(" ")
  : [];

if (SERVERS.length <= 0) {
  throw new Error("Fatal: No cache servers configured");
}

const nodes = getCacheServerNodes(SERVERS, WEIGHT);

nodes.forEach((node) => console.log(`Created node ${node.toString()}`));

const put = async (payload) => {
  const { key } = payload;
  const node = findNode(nodes, hash(key));
  console.log(`Fetched node ${node.toString()} for put key ${key}`);
  await requester(node).saveCachedData(payload);
};

const get = async (key) => {
  const node = findNode(nodes, hash(key));
  console.log(`Fetched node ${node.toString()} for get key ${key}`);
  return await requester(node).getCachedValueByKey(key);
};

const server = http.createServer(async (request, response) => {
  if (request.method === "POST") {
    console.log(`POST request received`);

    let body = "";
    request.on("data", (data) => (body += data));
    request.on("end", async () => {
      try {
        await put(JSON.parse(body));
        console.log(`Key:Value saved successfully for ${JSON.stringify(body)}`);
        response.writeHead(200, { "Content-Type": "text/json" });
        response.end(JSON.stringify({ message: "success" }));
      } catch (error) {
        console.log("Error", JSON.stringify(error));
        response.writeHead(500, { "Content-Type": "text/json" });
        response.end(
          JSON.stringify({ message: "failure", error: error.message })
        );
      }
    });
  } else {
    console.log(`GET request received`);

    const key = request.url.split("/")[1];
    try {
      const value = await get(key);
      console.log(`Get value success for key ${key}. Value = ${value}`);
      response.writeHead(200, { "Content-Type": "text/json" });
      response.end(JSON.stringify({ message: "success", value }));
    } catch (error) {
      console.log("Error", JSON.stringify(error));
      response.writeHead(500, { "Content-Type": "text/json" });
      response.end(
        JSON.stringify({ message: "failure", error: error.message })
      );
    }
  }
});

server.listen(PORT, HOST);
console.log(`Listening at http://${HOST}:${PORT}`);
