// Перечисления места для вставки DOM-элемента
const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};
// Получаем произвольный item массива
const getRandomItem = (array) => { // изменить имя на getRandomItem
  const random = Math.floor(Math.random() * array.length);
  return array[random];
};
// Получаем произвольный index массива
const getRandomIndex = (array) => { // изменить имя на getRandomIndex
  return Math.floor(Math.random() * array.length);
};
// Получаем произвольное число от минимального и максимального
const getRandomIntervalNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};
// Функции для фильтров
const getWatchlistCount = (movieCards) => {
  return movieCards.filter((card) => card.isWatchlist);
};
const getWatchedCount = (movieCards) => {
  return movieCards.filter((card) => card.isWatched);
};
const getFavoriteCount = (movieCards) => {
  return movieCards.filter((card) => card.isFavorite);
};
// Функция для создания DOM-элемента
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
// Функция для отрисовки созданного DOM-элемента
const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
// Получаем максимальное значение рейтинга и комментариев для экстракарточек
const getIndexRatingCards = (cards, propPath) => {
  const startValue = [0];
  const maxIndexes = [0];

  const propNames = propPath.split(`.`);

  for (const [index, card] of cards.entries()) {
    const prop = propNames.reduce((obj, name) => {
      return obj[name];
    }, card);

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

export {getRandomItem, getRandomIndex, getRandomIntervalNumber, getWatchlistCount, getWatchedCount, getFavoriteCount, createElement, render, RenderPosition, getIndexRatingCards};
