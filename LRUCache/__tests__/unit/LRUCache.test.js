const LRUCache = require("../../LRUCache");

describe("LRUCache Tests", () => {
  it("should return null if key is not found", () => {
    const cache = LRUCache(2);
    expect(cache.get("not_found_key")).toBeNull();
  });

  it("should get value if key is found", () => {
    const { get, put } = LRUCache(2);
    put("a_key", "a_value");
    expect(get("a_key")).toBe("a_value");
  });

  it("should not get old value if cache is full", () => {
    const { get, put } = LRUCache(3);
    put("a_key1", "a_value1");
    put("a_key2", "a_value2");
    put("a_key3", "a_value3");
    put("a_key4", "a_value4");
    expect(get("a_key1")).toBeNull();
    expect(get("a_key4")).toBe("a_value4");
  });
});
