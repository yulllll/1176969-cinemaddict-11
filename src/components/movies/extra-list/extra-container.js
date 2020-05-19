import AbstractComponent from "../../abstract.js";

export default class ExtraCardContainer extends AbstractComponent {
  constructor() {
    super();

    this._movies = null;
    this._ratedData = null;
    this._commentedData = null;
  }

  getTemplate() {
    return (
      `<div class="films-list__container"></div>`
    );
  }

  getExtraData(movies, count) {
    this._movies = movies;
    this._ratedData = this._movies.slice();
    this._commentedData = this._movies.slice();

    const maxMovieRatingsData = this._ratedData.sort((firstMovie, secondMovie) => {
      return secondMovie.movieInfo.totalRating - firstMovie.movieInfo.totalRating;
    }).splice(0, count);

    const maxMovieCommentsData = this._commentedData.sort((firstMovie, secondMovie) => {
      return secondMovie.comments.length - firstMovie.comments.length;
    }).splice(0, count);

    return {
      topRated: maxMovieRatingsData,
      mostCommented: maxMovieCommentsData,
    };
  }
}
