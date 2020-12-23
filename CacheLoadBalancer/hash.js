const CRC32 = require("crc-32");
const crypto = require("crypto");

const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const character = str.charCodeAt(i);
    hash = (hash << 5) - hash + character;
    hash = hash & hash;
  }
  return (hash >>> 0) % 360;
};

const crc32 = (str) => (CRC32.str(str) >>> 0) % 360;

const cryptoHash = (str) => {
  const hash = crypto.createHash("md5").update(str).digest("hex");
  const hashCodes = hash.split("").map((char) => char.charCodeAt(0));
  const result =
    ((hashCodes[3] << 24) |
      (hashCodes[2] << 16) |
      (hashCodes[1] << 8) |
      hashCodes[0]) >>>
    0;
  return result;
};

module.exports = {
  hashCode,
  crc32,
  cryptoHash,
};
