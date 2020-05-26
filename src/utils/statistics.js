import {getRuntimeSeparated} from "./date";
import {getTopGenres} from "./genres";
import {SHOW_STATISTICS_PERIOD, STATISTIC_FILTER_NAMES} from "../const";

export const getStatistics = (movies) => {
  const inWatchlist = movies.filter((movie) => movie.userDetails.isWatchlist);
  const watchListLength = inWatchlist.length;

  const commonRuntime = inWatchlist.reduce((acc, movie) => {
    return acc + movie.movieInfo.runtime;
  }, 0);

  const allRuntimeHours = getRuntimeSeparated(commonRuntime).hours;
  const allRuntimeMinutes = getRuntimeSeparated(commonRuntime).minutes;

  const moviesWatchListGenres = [];
  for (const movie of inWatchlist) {
    moviesWatchListGenres.push(movie.movieInfo.genres);
  }
  const movieGenresFlat = moviesWatchListGenres.flat();
  const topGenre = getTopGenres(movieGenresFlat).topGenre;
  const topGenres = getTopGenres(movieGenresFlat).topGenres;
  const topGenresWithIndex = getTopGenres(movieGenresFlat).sortGenresByIndex;

  return {
    watchListLength,
    allRuntimeHours,
    allRuntimeMinutes,
    topGenre,
    topGenres,
    topGenresWithIndex,
  };
};

export const getMoviesByStatistics = (target, movies, moviesByFilter, activeFilter, periodDate) => {
  switch (target) {
    case `today`:
      moviesByFilter = movies.filter((movie) => {
        activeFilter = STATISTIC_FILTER_NAMES.TODAY;
        return movie.userDetails.watchingDate > periodDate.setDate(periodDate.getDate() - SHOW_STATISTICS_PERIOD.TODAY);
      });
      break;
    case `week`:
      moviesByFilter = movies.filter((movie) => {
        activeFilter = STATISTIC_FILTER_NAMES.WEEK;
        return movie.userDetails.watchingDate > periodDate.setDate(periodDate.getDate() - SHOW_STATISTICS_PERIOD.WEEK);
      });
      break;
    case `month`:
      moviesByFilter = movies.filter((movie) => {
        activeFilter = STATISTIC_FILTER_NAMES.MONTH;
        return movie.userDetails.watchingDate > periodDate.setDate(periodDate.getDate() - SHOW_STATISTICS_PERIOD.MONTH);
      });
      break;
    case `year`:
      moviesByFilter = movies.filter((movie) => {
        activeFilter = STATISTIC_FILTER_NAMES.YEAR;
        return movie.userDetails.watchingDate > periodDate.setDate(periodDate.getDate() - SHOW_STATISTICS_PERIOD.YEAR);
      });
      break;
    case `all-time`:
      activeFilter = STATISTIC_FILTER_NAMES.ALL;
      moviesByFilter = movies;
      break;
  }

  return {
    moviesByFilter,
    activeFilter,
  };
};
