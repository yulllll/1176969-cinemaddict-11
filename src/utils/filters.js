import {FilterTypes} from "../const.js";

export const getFilterMoviesData = (moviesData, filterType) => {
  switch (filterType) {
    case FilterTypes.WATCHLIST:
      return moviesData.filter((movie) => movie.userDetails.isWatchlist);
    case FilterTypes.HISTORY:
      return moviesData.filter((movie) => movie.userDetails.isWatched);
    case FilterTypes.FAVORITES:
      return moviesData.filter((movie) => movie.userDetails.isFavorite);
    default:
      return moviesData;
  }
};
