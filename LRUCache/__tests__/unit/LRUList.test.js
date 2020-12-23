const LRUList = require("../../LRUList");

describe("LRUList Tests", () => {
  it("should not remove anything if list is empty", () => {
    const lruList = new LRUList();

    const removedValue = lruList.removeTail();

    expect(removedValue).toBeNull();
    expect(lruList.isEmpty()).toBe(true);
    expect(lruList.getSize()).toBe(0);
  });

  it("should remove last element from an non empty list", () => {
    const lruList = new LRUList();
    lruList.add(1);
    lruList.add(2);
    lruList.add(3);

    const removedValue = lruList.removeTail();

    expect(removedValue).toBe(1);
    expect(lruList.getSize()).toBe(2);
  });

  it("should add to an empty list", () => {
    const lruList = new LRUList();
    lruList.add(1);
    expect(lruList.getHead()).toBe(1);
    expect(lruList.getTail()).toBe(1);
    expect(lruList.getSize()).toBe(1);
  });

  it("should add to an non empty list", () => {
    const lruList = new LRUList();
    lruList.add(1);
    lruList.add(2);
    lruList.add(3);
    expect(lruList.getHead()).toBe(3);
    expect(lruList.getTail()).toBe(1);
    expect(lruList.getSize()).toBe(3);
  });

  it("should move element to head when existing element is added to the list and remove existing element if it's the last element in list", () => {
    let lruList = new LRUList();
    lruList.add(1);
    lruList.add(2);
    lruList.add(3);
    lruList.add(1);
    expect(lruList.getHead()).toBe(1);
    expect(lruList.getTail()).toBe(2);
    expect(lruList.getSize()).toBe(3);

    lruList = new LRUList();
    lruList.add(1);
    lruList.add(1);
    expect(lruList.getHead()).toBe(1);
    expect(lruList.getTail()).toBe(1);
    expect(lruList.getSize()).toBe(1);
  });

  it("should move element to head when existing element is added to the list", () => {
    const lruList = new LRUList();
    lruList.add(1);
    lruList.add(2);
    lruList.add(3);
    lruList.add(2);
    expect(lruList.getHead()).toBe(2);
    expect(lruList.getTail()).toBe(1);
    expect(lruList.getSize()).toBe(3);
  });
});
