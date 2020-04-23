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

export {getRandomItem, getRandomIndex, getRandomIntervalNumber, getWatchlistCount, getWatchedCount, getFavoriteCount};
