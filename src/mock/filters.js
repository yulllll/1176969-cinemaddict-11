import {getWatchlistCount, getWatchedCount, getFavoriteCount} from "../utils.js";
// Генерируем значения фильтров
const generateFilters = (movieCards) => {
  return {
    isWatchlist: getWatchlistCount(movieCards).length,
    isWatched: getWatchedCount(movieCards).length,
    isFavorite: getFavoriteCount(movieCards).length,
  };
};

export {generateFilters};
