// Коды клавиш
export const KeyCode = {
  ESCAPE: 27,
};
// Получаем произвольный item массива
export const getRandomItem = (array) => { // изменить имя на getRandomItem
  const random = Math.floor(Math.random() * array.length);
  return array[random];
};

// Получаем произвольный index массива
export const getRandomIndex = (array) => { // изменить имя на getRandomIndex
  return Math.floor(Math.random() * array.length);
};

// Получаем произвольное число от минимального и максимального
export const getRandomIntervalNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

// Генерируем произвольную дату
export const getRandomDate = () => {
  const targetDate = new Date();
  const day = getRandomIntervalNumber(1, 31);
  const month = getRandomIntervalNumber(1, 12);
  const year = getRandomIntervalNumber(2015, 2020);

  targetDate.setFullYear(year, month, day);
  const options = {year: `numeric`, month: `long`, day: `numeric`};

  return targetDate.toLocaleDateString(`en-GB`, options);
};

// Получаем количество фильмов для указанной метки (Watchlist, Watched, Favorite)
export const getMarkCount = (array, propPath) => {
  const propNames = propPath.split(`.`);

  // Массив из положительных элементов
  const affArray = array.filter((item) => {
    return propNames.reduce((obj, name) => obj[name], item);
  });

  return affArray.length;
};

// Получаем размер заголовка согласно лимита
export const computeDescriptionLength = (string, limit) => {
  let newString;
  if (string.length > limit) {
    newString = `${(string.substr(0, limit - 1)).trim()}...`;
  } else {
    newString = string;
  }

  return newString;
};

// Получаем максимальное значение рейтинга и комментариев для экстракарточек
export const getIndexRatingCards = (array, propPath) => {
  const startValue = [0];
  const maxIndexes = [0];

  const propNames = propPath.split(`.`);

  for (const [index, item] of array.entries()) {
    const prop = propNames.reduce((obj, name) => {
      return obj[name];
    }, item);

    if (prop > startValue[startValue.length - 1]) {
      startValue.push(prop);
      maxIndexes.push(index);

      continue;
    }
    if (prop > startValue[startValue.length - 2]) {
      startValue[startValue.length - 2] = prop;
      maxIndexes[maxIndexes.length - 2] = index;
    }
  }

  return {
    maxIndex: maxIndexes.pop(),
    nextIndex: maxIndexes.pop(),
  };
};
