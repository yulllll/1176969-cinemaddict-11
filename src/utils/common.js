import {MONTHS_NAMES} from "../utils/const.js";

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

// Дата в формате ДД/ММ/ГГ
export const getReleaseDate = (date) => {
  const targetDate = new Date(date);
  const day = targetDate.getDate();
  const month = MONTHS_NAMES[targetDate.getMonth()];
  const year = targetDate.getFullYear();

  return `${day} ${month} ${year}`;
};

// Дата в формате ГГ/ММ/ДД ЧЧ:СС
export const getCommentsDate = (date) => {
  const targetDate = new Date(date);
  const day = targetDate.getDate();
  const month = MONTHS_NAMES[targetDate.getMonth()];
  const year = targetDate.getFullYear();
  const hours = targetDate.getHours() >= 10 ? `${targetDate.getHours()}` : `0${targetDate.getHours()}`;
  const min = targetDate.getMinutes() >= 10 ? `${targetDate.getMinutes()}` : `0${targetDate.getMinutes()}`;

  return `${year}/${month}/${day} ${hours}:${min}`;
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
