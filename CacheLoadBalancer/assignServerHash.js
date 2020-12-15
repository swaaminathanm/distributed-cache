const hash = require("./hash");

module.exports = (serverDomains = []) => {
  return serverDomains.reduce((result, domain) => {
    result[domain] = hash(domain);
    return result;
  }, {});
};