import {getWatchlistCount, getWatchedCount, getFavoriteCount} from "../utils/common.js";
// Генерируем значения фильтров
const generateFilters = (movieCards) => {
  return {
    watchlistQuantity: getWatchlistCount(movieCards).length,
    watchedQuantity: getWatchedCount(movieCards).length,
    favoriteQuantity: getFavoriteCount(movieCards).length,
  };
};

export {generateFilters};
