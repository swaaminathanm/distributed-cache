const findServer = require("../findServer");

describe("findServer tests", () => {
  const serverAndHashMap = {
    "abc1.com": 200,
    "abc2.com": 350,
    "abc3.com": 100,
    "abc4.com": 150,
    "abc5.com": 250
  }

  it("should return starting hash of server if value is greater than server hashes", () => {
    expect(findServer(serverAndHashMap, 352)).toBe("abc3.com");
  });

  it("should return nearest greatest server value if there is a nearest greatest hash for given value", () => {
    expect(findServer(serverAndHashMap, 202)).toBe("abc5.com");
    expect(findServer(serverAndHashMap, 10)).toBe("abc3.com");
  });

  it("should return proper server value if there is a hash for given value", () => {
    expect(findServer(serverAndHashMap, 100)).toBe("abc3.com");
  });
});