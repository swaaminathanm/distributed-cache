module.exports = class Node {
  constructor(domain, key, label) {
    this.domain = domain;
    this.key = key;
    this.label = label;
  }

  toString() {
    return `URL: ${this.domain}; LABEL: ${this.label}`;
  }
};
