import {getRuntimeSeparated} from "./date.js";
import {getTopGenres} from "./genres.js";
import {SHOW_STATISTICS_PERIOD, StatisticFilterName} from "../const.js";

export const getStatistics = (movies) => {
  const inWatched = movies.filter((movie) => movie.userDetails.isWatched);
  const watchedMoviesLength = inWatched.length;

  const commonRuntime = inWatched.reduce((acc, movie) => {
    return acc + movie.movieInfo.runtime;
  }, 0);

  const allRuntimeHours = getRuntimeSeparated(commonRuntime).hours;
  const allRuntimeMinutes = getRuntimeSeparated(commonRuntime).minutes;

  const moviesWatchListGenres = [];
  for (const movie of inWatched) {
    moviesWatchListGenres.push(movie.movieInfo.genres);
  }
  const movieGenresFlat = moviesWatchListGenres.flat();
  const topGenre = getTopGenres(movieGenresFlat).topGenre;
  const topGenres = getTopGenres(movieGenresFlat).topGenres;
  const topGenresWithIndex = getTopGenres(movieGenresFlat).sortGenresByIndex;

  return {
    watchedMoviesLength,
    allRuntimeHours,
    allRuntimeMinutes,
    topGenre,
    topGenres,
    topGenresWithIndex,
  };
};

export const getMoviesByStatistics = (target, movies, moviesByFilter, activeFilter, periodDate) => {
  switch (target) {
    case StatisticFilterName.TODAY:
      moviesByFilter = movies.filter((movie) => {
        activeFilter = StatisticFilterName.TODAY;
        return movie.userDetails.watchingDate > periodDate.setDate(periodDate.getDate() - SHOW_STATISTICS_PERIOD.TODAY);
      });
      break;
    case StatisticFilterName.WEEK:
      moviesByFilter = movies.filter((movie) => {
        activeFilter = StatisticFilterName.WEEK;
        return movie.userDetails.watchingDate > periodDate.setDate(periodDate.getDate() - SHOW_STATISTICS_PERIOD.WEEK);
      });
      break;
    case StatisticFilterName.MONTH:
      moviesByFilter = movies.filter((movie) => {
        activeFilter = StatisticFilterName.MONTH;
        return movie.userDetails.watchingDate > periodDate.setDate(periodDate.getDate() - SHOW_STATISTICS_PERIOD.MONTH);
      });
      break;
    case StatisticFilterName.YEAR:
      moviesByFilter = movies.filter((movie) => {
        activeFilter = StatisticFilterName.YEAR;
        return movie.userDetails.watchingDate > periodDate.setDate(periodDate.getDate() - SHOW_STATISTICS_PERIOD.YEAR);
      });
      break;
    case StatisticFilterName.ALL:
      activeFilter = StatisticFilterName.ALL;
      moviesByFilter = movies;
      break;
  }

  return {
    moviesByFilter,
    activeFilter,
  };
};
