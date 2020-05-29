export const getExtraData = (movies, count) => {

  const ratedData = movies.slice();
  const commentedData = movies.slice();

  const maxMovieRatingsData = ratedData.sort((firstMovie, secondMovie) => {
    return secondMovie.movieInfo.totalRating - firstMovie.movieInfo.totalRating;
  }).splice(0, count);

  const maxMovieCommentsData = commentedData.sort((firstMovie, secondMovie) => {
    return secondMovie.comments.length - firstMovie.comments.length;
  }).splice(0, count);

  return {
    topRated: maxMovieRatingsData,
    mostCommented: maxMovieCommentsData,
  };
};
