const { ACCEPTED_VALUE_TYPES } = require("./constants");
const LRUList = require("./LRUList");

module.exports = (cacheSize) => {
  const lruList = new LRUList();
  const cacheMap = {};
  const removeCountWhenFull = Math.ceil(cacheSize * 0.3);

  const isCacheFull = () => {
    return Object.keys(cacheMap).length >= cacheSize;
  };

  const isValid = (value) => {
    const valueType = typeof value;
    return ACCEPTED_VALUE_TYPES.includes(valueType);
  };

  const transform = (value) => {
    if (typeof value === "object") {
      return JSON.stringify(value);
    }
    return value;
  };

  const get = (key) => {
    return cacheMap[key] || null;
  };

  const put = (key, value) => {
    if (isValid(value)) {
      if (isCacheFull()) {
        for (let i = 0; i < removeCountWhenFull; i++) {
          const removedKey = lruList.removeTail();
          if (removedKey) {
            delete cacheMap[removedKey];
          }
        }
      }
      cacheMap[key] = transform(value);
      lruList.add(key);
    } else {
      throw new Error(
        `Invalid value. Accepted value types are: ${ACCEPTED_VALUE_TYPES.join(
          ","
        )}`
      );
    }
  };

  return {
    get,
    put,
  };
};
