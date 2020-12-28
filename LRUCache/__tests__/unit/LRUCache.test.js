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
    const { get, put } = LRUCache(10);
    put("a_key1", "a_value1");
    put("a_key2", "a_value2");
    put("a_key3", "a_value3");
    put("a_key4", "a_value4");
    put("a_key5", "a_value5");
    put("a_key6", "a_value6");
    put("a_key7", "a_value7");
    put("a_key8", "a_value8");
    put("a_key9", "a_value9");
    put("a_key10", "a_value10");
    put("a_key11", "a_value11");
    expect(get("a_key1")).toBeNull();
    expect(get("a_key2")).toBeNull();
    expect(get("a_key3")).toBeNull();
    for (let i = 4; i <= 10; i++) {
      expect(get(`a_key${i}`)).toBe(`a_value${i}`);
    }
    expect(get("a_key11")).toBe("a_value11");
  });
});
