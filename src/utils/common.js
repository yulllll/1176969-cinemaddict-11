export const KeyCode = {
  ESCAPE: 27,
};
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


// Количество активных киноконтроллеров в кинокарточке
export const getControlsCount = (array, propPath) => {
  const propNames = propPath.split(`.`);

  // Массив из положительных элементов
  const affArray = array.filter((item) => {
    return propNames.reduce((obj, name) => obj[name], item);
  });

  return affArray.length;
};

// Длинна заголовка
export const getMaxDescriptionLength = (string, limit) => {
  let newString;
  if (string.length > limit) {
    newString = `${(string.substr(0, limit - 1)).trim()}...`;
  } else {
    newString = string;
  }

  return newString;
};
