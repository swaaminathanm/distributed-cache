const CRC32 = require('crc-32');

module.exports = (str) => {
  return (CRC32.str(str) >>> 0) % 360;
}