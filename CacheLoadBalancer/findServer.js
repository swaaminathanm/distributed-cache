const findGreaterOrEqual = (numbers = [], start, end, value) => {
  if (start > end || end < start) {
    return -1;
  }

  let prevPivot = -1;
  let pivot = start + Math.floor((end - start) / 2);
  const pivotValue = numbers[pivot];

  if (value < pivotValue) {
    prevPivot = findGreaterOrEqual(numbers, start, pivot - 1, value);
  } else if (value > pivotValue) {
    prevPivot = findGreaterOrEqual(numbers, pivot + 1, end, value);
  }

  if (prevPivot !== -1) {
    pivot = prevPivot;
  }

  return pivot;
};

module.exports = (serverAndHashMap, value) => {
  const numbers = Object.values(serverAndHashMap).sort();
  if (numbers.length < 0) {
    throw new Error("Fatal: serverAndHashMap should not be empty");
  }

  let index = 0;
  if (value <= numbers[numbers.length - 1]) {
    index = findGreaterOrEqual(numbers, 0, numbers.length - 1, value);
  }

  return Object.keys(serverAndHashMap).find(key => serverAndHashMap[key] === numbers[index]);
};