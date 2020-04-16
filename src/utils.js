// Получаем произвольное значение массива
const getRandomIndex = (array) => {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
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

export {getRandomIndex, getRandomIntervalNumber, getWatchlistCount, getWatchedCount, getFavoriteCount};
