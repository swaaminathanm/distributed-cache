const { cryptoHash: hashFn } = require("./hash");
const Node = require("./Node");

module.exports = (serverDomainNames, weight) => {
  const nodes = [];
  for (let i = 0; i < serverDomainNames.length; i++) {
    const serverDomainName = serverDomainNames[i];
    for (let j = 0; j < weight; j++) {
      const label = serverDomainName + "-" + j;
      const key = hashFn(label);
      const node = new Node(serverDomainName, key, label);
      nodes.push(node);
    }
  }
  return nodes.sort((node1, node2) => node1.key - node2.key);
};
