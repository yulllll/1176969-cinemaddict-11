import AbstractComponent from "../../abstract.js";

export default class ExtraContainer extends AbstractComponent {
  constructor() {
    super();

    this._movies = null;
    this._extraShowingCount = null;
    this._ratedData = null;
    this._commentedData = null;
  }

  getExtraData(movies, count) {
    this._movies = movies;
    this._extraShowingCount = count;
    this._ratedData = this._movies.slice();
    this._commentedData = this._movies.slice();

    return {
      topRated: this._ratedData.sort((firstMovie, secondMovie) => secondMovie.movieInfo.totalRating - firstMovie.movieInfo.totalRating)
          .splice(0, this._extraShowingCount),
      mostCommented: this._commentedData.sort((firstMovie, secondMovie) => secondMovie.comments.length - firstMovie.comments.length)
          .splice(0, this._extraShowingCount),
    };
  }

  getTemplate() {
    return (
      `<div class="films-list__container"></div>`
    );
  }
}
