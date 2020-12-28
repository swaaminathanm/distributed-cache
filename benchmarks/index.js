const axios = require("axios");

const URL =  "http://localhost:32222/";
const REQUEST_COUNT = 2000;

const requestClient = axios.create({
  baseURL: URL,
  timeout: 1000,
});

const get = async (key) => {
  const { data } = await requestClient.get(`/${key}`);
  if (data.message === "success") {
    return data.value;
  } else {
    throw new Error(data.error);
  }
};

const save = async ({ key, value }) => {
  const { data } = await requestClient.post("/", { key, value });
  if (data.message === "failure") {
    throw new Error(data.error);
  }
};

const logger = (data) => {
  console.log("---");
  Object.keys(data).forEach((key) => {
    const title = key.replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
    console.log(`${title} : ${data[key]}`);
  });
  console.log("---");
}

const main = async () => {
  let requestCount = REQUEST_COUNT;
  let catchMissCount = 0;

  for (let i=0; i<requestCount; i++) {
    console.log(`Processing request #${i + 1}`);
    const data = {
      key: `key-${i}`,
      value: `value-${i}`
    };
    try {
      const value = await get(data.key);
      if (!value) {
        await save(data);
        catchMissCount += 1;
      }
    } catch (err) {
      console.error(`Error occurred with key ${data.key}. ${err.message}`);
    }
  }

  const cacheHitCount = requestCount - catchMissCount;

  logger({
    requestCount,
    cacheHitCount,
    catchMissCount,
    catchHitPercent: `${Math.ceil((cacheHitCount/requestCount)*100)}%`,
    cacheMissPercent: `${Math.ceil((catchMissCount/requestCount)*100)}%`
  });
};

main();