const hash = require("../hash");

it("should return a number greater than 0 and lesser than 360", () => {
  const val = hash("www.someserverdomain.com");
  expect(val).toBeLessThan(360);
  expect(val).toBeGreaterThan(0);
})