class Node {
  constructor(value) {
    this.next = null;
    this.previous = null;
    this.value = value;
  }
}

class LRUList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  getHead() {
    return this.head.value;
  }

  getTail() {
    return this.tail.value;
  }

  getSize() {
    return this.size;
  }

  add(value) {
    const node = new Node(value);
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      const foundNode = this._getNode(value);
      if (!foundNode) {
        this._addNodeToHead(node);
      } else {
        this._remove(foundNode);
        this._addNodeToHead(foundNode);
      }
    }
    this.size += 1;
  }

  removeTail() {
    return this._remove();
  }

  _remove(node) {
    let removedValue = null;

    if (this.isEmpty()) {
      return removedValue;
    }

    if (this.getSize() <= 1) {
      this.head = null;
      this.tail = null;
      this.size -= 1;
      return;
    }

    if (!node || this._isLastNode(node)) {
      const last = this.tail;
      const newLastNode = last.previous;
      newLastNode.next = null;
      this.tail = newLastNode;
      removedValue = last.value;
    } else {
      const previousNode = node.previous;
      const nextNode = node.next;
      previousNode.next = node.next;
      nextNode.previous = node.previous;
      removedValue = node.value;
    }
    this.size -= 1;
    return removedValue;
  }

  isEmpty() {
    return this.head === null && this.tail === null;
  }

  _isLastNode(node) {
    if (this.tail) {
      return this.tail.value === node.value;
    }
    return false;
  }

  _addNodeToHead(node) {
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      node.previous = null;
      node.next = this.head;
      this.head.previous = node;
      this.head = node;
    }
  }

  _getNode(value) {
    const getNodeRecursive = (node) => {
      if (!node) {
        return null;
      } else if (node.value === value) {
        return node;
      } else {
        return getNodeRecursive(node.next);
      }
    };
    return getNodeRecursive(this.head);
  }
}

module.exports = LRUList;
