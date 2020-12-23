const findGreaterOrEqual = (numbers = [], start, end, value) => {
  let pivot = start + Math.floor((end - start) / 2);
  const pivotValue = numbers[pivot];
  let newStart;
  let newEnd;

  if (value < pivotValue) {
    newStart = start;
    newEnd = pivot - 1;
    if (newEnd < newStart) {
      return pivot;
    }
  } else if (value > pivotValue) {
    newStart = pivot + 1;
    newEnd = end;
    if (newStart > newEnd) {
      return pivot + 1 >= numbers.length ? pivot : pivot + 1;
    }
  } else {
    return pivot;
  }
  return findGreaterOrEqual(numbers, newStart, newEnd, value);
};

module.exports = (nodes, value) => {
  const keys = nodes.map((node) => node.key);
  if (keys.length < 0) {
    throw new Error("Fatal: serverAndHashMap should not be empty");
  }

  let index = 0;
  if (value <= nodes[nodes.length - 1].key) {
    index = findGreaterOrEqual(keys, 0, nodes.length - 1, value);
  }

  return nodes[index];
};
