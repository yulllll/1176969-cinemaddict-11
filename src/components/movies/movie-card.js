import AbstractComponent from "../abstract.js";
import {computeDescriptionLength} from "../../utils/common.js";

const DESCRIPTION_LIMIT = 140;

export default class MovieCard extends AbstractComponent {
  constructor(movie) {
    super();

    this._movie = movie;
    this._descriptionLimit = DESCRIPTION_LIMIT;
    this._movieControls = [
      {item: `Add to watchlist`, className: `add-to-watchlist`, check: this._movie.userDetails.isWatchlist},
      {item: `Mark as watched`, className: `mark-as-watched`, check: this._movie.userDetails.isWatched},
      {item: `Mark as favorite`, className: `favorite`, check: this._movie.userDetails.isFavorite}
    ];
  }

  _getControlsTemplate() {
    return this._movieControls.map(({item, className, check}) => {
      return (
        `<button class="film-card__controls-item button film-card__controls-item--${className} ${check ? `film-card__controls-item--active` : ``}">${item}</button>`
      );
    }).join(``);
  }

  setCardClickListener(cb) {
    this.getElement().addEventListener(`click`, (evt) => cb(evt, this._movie, this));
  }

  getTemplate() {
    const {title, totalRating, release, runtime, genres, poster, description} = this._movie.movieInfo;

    return (
      `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
            <span class="film-card__year">${release.date}</span>
            <span class="film-card__duration">${runtime}</span>
            <span class="film-card__genre">${genres[0]}</span>
        </p>
        <img src="./images/posters/${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${computeDescriptionLength(description, this._descriptionLimit)}</p>
        <a class="film-card__comments">${this._movie.comments.length} comments</a>
        <form class="film-card__controls">
            ${this._getControlsTemplate()}
        </form>
       </article>`
    );
  }
}
