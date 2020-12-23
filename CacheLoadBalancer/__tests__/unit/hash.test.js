const { crc32, hashCode, cryptoHash } = require("../../hash");

it("crc32 should return a number greater than 0 and lesser than 360", () => {
  const val = crc32("www.someserverdomain.com");
  expect(val).toBeLessThan(360);
  expect(val).toBeGreaterThan(0);
});

it("hashCode should return a number greater than 0 and lesser than 360", () => {
  const val = hashCode("www.someserverdomain.com");
  expect(val).toBeLessThan(360);
});

it("cryptoHash", () => {
  const val = cryptoHash("www.someserverdomain.com");
  expect(typeof val).toBe("number");
});
