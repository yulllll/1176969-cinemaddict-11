import {getFilterMoviesData} from "./filters.js";
import {FilterTypes, UserRanks} from "../const.js";

export const getUserRank = (moviesData) => {
  let userRank = null;
  const userWatchedCount = getFilterMoviesData(moviesData, FilterTypes.HISTORY).length;

  if (userWatchedCount > 1 && userWatchedCount <= 10) {
    userRank = UserRanks.NOVICE;
  } else if (userWatchedCount > 10 && userWatchedCount <= 20) {
    userRank = UserRanks.FAN;
  } else if (userWatchedCount > 20) {
    userRank = UserRanks.MOVIE_BUFF;
  } else {
    userRank = ``;
  }

  return userRank;
};
