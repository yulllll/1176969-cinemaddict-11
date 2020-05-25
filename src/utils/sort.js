import {SortType} from "../const.js";

export const getSortedMovies = (sortType, movies, from, to) => {
  let sortedMovies = [];
  const showingMovies = movies.slice();

  switch (sortType) {
    case SortType.SORT_DATE:
      sortedMovies = showingMovies.sort((a, b) => {
        // TODO: перепроверить после получения данных и переписать
        const releaseDateA = new Date(a.movieInfo.release.date);
        const releaseDateB = new Date(b.movieInfo.release.date);

        return releaseDateB - releaseDateA;
      });
      break;

    case SortType.SORT_RATING:
      sortedMovies = showingMovies.sort((a, b) => {
        return b.movieInfo.totalRating - a.movieInfo.totalRating;
      });
      break;

    case SortType.DEFAULT:
      sortedMovies = showingMovies;
      break;
  }

  return sortedMovies.slice(from, to);
};
