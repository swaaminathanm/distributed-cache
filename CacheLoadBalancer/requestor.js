const axios = require("axios");

const requestClient = axios.create({
  timeout: 1000,
});

const requester = (node) => {
  const getCachedValueByKey = async (key) => {
    try {
      const { data } = await requestClient.get(`${node.domain}/${key}`);
      if (data.type === "success") {
        return data.value;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  };

  const saveCachedData = async ({ key, value }) => {
    try {
      const { data } = await requestClient.post(node.domain, { key, value });
      if (data.type === "failure") {
        throw new Error(data.message);
      }
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  };

  return {
    getCachedValueByKey,
    saveCachedData,
  };
};

module.exports = requester;
