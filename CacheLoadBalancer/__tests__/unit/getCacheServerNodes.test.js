const getCacheServerNodes = require("../../getCacheServerNodes");

describe("getCacheServerNodes Tests", () => {
  const domains = [
    "http://cache-0.cache.default.svc.cluster.local:8080",
    "http://cache-1.cache.default.svc.cluster.local:8080",
    "http://cache-2.cache.default.svc.cluster.local:8080",
    "http://cache-3.cache.default.svc.cluster.local:8080",
    "http://cache-4.cache.default.svc.cluster.local:8080",
  ];
  const weight = 10;

  const checkIfSorted = (nodes) => {
    let isSorted = true;
    for (let j = 0; j < nodes.length - 1; j++) {
      if (nodes[j].key > nodes[j + 1].key) {
        isSorted = false;
        break;
      }
    }
    return isSorted;
  };

  it("should return sorted nodes array for given domains and weight", () => {
    const result = getCacheServerNodes(domains, weight);
    expect(result.length).toBe(domains.length * weight);
    expect(checkIfSorted(result)).toBe(true);
    for (let i = 0; i < domains.length; i++) {
      for (let j = 0; j < weight; j++) {
        const node = result[i + j];
        expect(typeof node.key).toBe("number");
        expect(domains.includes(node.domain)).toBe(true);
      }
    }
  });

  it("should return empty nodes when domains are empty", () => {
    const result = getCacheServerNodes([], weight);
    expect(result.length).toBe(0);
  });
});
