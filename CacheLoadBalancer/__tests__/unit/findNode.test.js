const findNode = require("../../findNode");
const Node = require("../../Node");

describe("findServer tests", () => {
  const nodes = [
    new Node(
      "http://cache-0.cache.default.svc.cluster.local:8080",
      2,
      "http://cache-0.cache.default.svc.cluster.local:8080-1"
    ),
    new Node(
      "http://cache-1.cache.default.svc.cluster.local:8080",
      4,
      "http://cache-1.cache.default.svc.cluster.local:8080-1"
    ),
    new Node(
      "http://cache-2.cache.default.svc.cluster.local:8080",
      8,
      "http://cache-2.cache.default.svc.cluster.local:8080-1"
    ),
    new Node(
      "http://cache-3.cache.default.svc.cluster.local:8080",
      15,
      "http://cache-3.cache.default.svc.cluster.local:8080-1"
    ),
    new Node(
      "http://cache-4.cache.default.svc.cluster.local:8080",
      20,
      "http://cache-4.cache.default.svc.cluster.local:8080-1"
    ),
  ];

  it("should return starting hash of server if value is greater than server hashes", () => {
    expect(findNode(nodes, 21).domain).toBe(
      "http://cache-0.cache.default.svc.cluster.local:8080"
    );
  });

  it("should return nearest greatest server value if there is a nearest greatest hash for given value", () => {
    expect(findNode(nodes, 16).domain).toBe(
      "http://cache-4.cache.default.svc.cluster.local:8080"
    );
    expect(findNode(nodes, 1).domain).toBe(
      "http://cache-0.cache.default.svc.cluster.local:8080"
    );
  });

  it("should return proper server value if there is a hash for given value", () => {
    expect(findNode(nodes, 8).domain).toBe(
      "http://cache-2.cache.default.svc.cluster.local:8080"
    );
  });
});
