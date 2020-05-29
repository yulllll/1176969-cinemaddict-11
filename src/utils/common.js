// Произвольный item массива
export const getRandomItem = (array) => {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
};

// Произвольный index массива
export const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};

// Произвольное число от минимального и максимального
export const getRandomIntervalNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

// Длинна описания
export const getNewTrimmedString = (string, limit) => {
  let newString;
  if (string.length > limit) {
    newString = `${(string.substr(0, limit - 1)).trim()}...`;
  } else {
    newString = string;
  }

  return newString;
};
