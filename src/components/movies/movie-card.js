import {getMaxDescriptionLength} from "../../utils/common.js";
import {MAX_DESCRIPTION_LENGTH} from "../../const.js";
import AbstractSmartComponent from "../abstract/abstract-smart.js";
import {
  getRuntimeFormat,
  getReleaseYearFormat,
} from "../../utils/date.js";

const getMovieCardControlsTemplate = (controls) => {
  return controls.map(({item, className, check}) => {
    return (
      `<button class="film-card__controls-item button film-card__controls-item--${className} ${check ? `film-card__controls-item--active` : ``}">${item}</button>`
    );
  }).join(``);
};

const getMovieCardTemplate = (movie) => {
  const {title, totalRating, release, runtime, genres, poster, description} = movie.movieInfo;

  const movieCardControls = [
    {item: `Add to watchlist`, className: `add-to-watchlist`, check: movie.userDetails.isWatchlist},
    {item: `Mark as watched`, className: `mark-as-watched`, check: movie.userDetails.isWatched},
    {item: `Mark as favorite`, className: `favorite`, check: movie.userDetails.isFavorite}
  ];

  const releaseYear = getReleaseYearFormat(release.date);
  const genre = genres.splice(0, 1).join(``);
  const spliceDescription = getMaxDescriptionLength(description, MAX_DESCRIPTION_LENGTH);
  const commentsMovieLength = movie.comments.length;
  const movieCardControlsMarkup = getMovieCardControlsTemplate(movieCardControls);
  const runtimeFormat = getRuntimeFormat(runtime);

  return (
    `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
            <span class="film-card__year">${releaseYear}</span>
            <span class="film-card__duration">${runtimeFormat}</span>
            <span class="film-card__genre">${genre}</span>
        </p>
        <img src="./images/posters/${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${spliceDescription}</p>
        <a class="film-card__comments">${commentsMovieLength} comments</a>
        <form class="film-card__controls">
            ${movieCardControlsMarkup}
        </form>
       </article>`
  );
};


export default class MovieCard extends AbstractSmartComponent {
  constructor(movie) {
    super();

    this._movie = movie;

    this._onCardPosterClick = null;
    this._onCardTitleClick = null;
    this._onCardCommentsClick = null;
  }

  getTemplate() {
    return getMovieCardTemplate(this._movie);
  }

  recoveryListeners() {
    this.setCardPosterClickListener(this._onCardPosterClick);
    this.setCardTitleClickListener(this._onCardTitleClick);
    this.setCardCommentsClickListener(this._onCardCommentsClick);
  }

  rerender() {
    super.rerender();
  }

  setCardPosterClickListener(cb) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, cb);
  }

  setCardTitleClickListener(cb) {
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, cb);
  }

  setCardCommentsClickListener(cb) {
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, cb);
  }

  setAddWatchListClickListener(cb) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, cb);
  }

  setAddWatchedClickListener(cb) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, cb);
  }

  setAddFavoriteClickListener(cb) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, cb);
  }
}
