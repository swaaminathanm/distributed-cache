const assignServerHash = require("../assignServerHash");

it("should return domain, number for a list of server domains", () => {
  const serverDomains = ["abc.com", "xyz.com", "http://123.com", "https://myserver1.com", "https://myserver2.com"];
  const result = assignServerHash(serverDomains);
  serverDomains.forEach(serverDomain => {
    expect(typeof result[serverDomain]).toBe('number');
  });
})