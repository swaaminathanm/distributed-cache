const net = require("net");
const LRUCache = require("./LRUCache");

const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";
const CACHE_SIZE = process.env.CACHE_SIZE || 1000000;
const lruCache = LRUCache(CACHE_SIZE);

const writeSuccess = (socket, data) => {
  socket.write(
    JSON.stringify({
      type: "SUCCESS",
      data,
    })
  );
};

const writeError = (socket, message) => {
  socket.write(
    JSON.stringify({
      message: message || "Operational error",
      type: "ERROR",
    })
  );
};

const handlePut = (data = {}, socket) => {
  const key = data.key;
  const value = data.value;

  if (!key || !value) {
    writeError(socket, "Format not proper.");
  } else {
    lruCache.put(key, value);
    writeSuccess(socket, null);
  }
};

const handleGet = async (data = {}, socket) => {
  const key = data.key;

  if (!key) {
    writeError(socket, "Format not proper.");
  } else {
    const value = lruCache.get(key);
    writeSuccess(socket, { value });
  }
};

const connectionListener = (socket) => {
  socket.on("data", async (socketData) => {
    try {
      const dataJson = JSON.parse(socketData);
      const data = dataJson.data;
      const type = dataJson.type;

      if (type === "PUT") {
        handlePut(data, socket);
      } else if (type === "GET") {
        await handleGet(data, socket);
      } else {
        writeError(socket, "Unrecognized type. Only GET and PUT supported.");
      }
    } catch (error) {
      writeError(socket, error.message);
    }
  });
};

const server = net.createServer(connectionListener);

server.listen(PORT, HOSTNAME, () => {
  console.log("opened server on", server.address());
});
