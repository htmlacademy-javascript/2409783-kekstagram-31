const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomElement = (array) => array[getRandomInteger(0, array.length - 1)];

const getUniqueRandomInteger = (lower, upper) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(lower, upper);
    if (previousValues.length >= (upper - lower + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(lower, upper);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

export {getRandomInteger, getRandomElement, getUniqueRandomInteger};
