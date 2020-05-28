import AbstractSmartComponent from "../abstract/abstract-smart.js";
import MovieComments from "./movie-comments.js";
import {encode} from "he";

import {
  getReleaseDateFormat,
  getRuntimeFormat,
} from "../../utils/date.js";

const getGenresInfoTemplate = (genres) => {
  return genres.map((genre) => {
    return (
      `<span class="film-details__genre">${genre}</span>`
    );
  }).join(``);
};

const getMovieDetailsInfoTemplate = (movie) => {
  const {poster, ageRating, title, altTitle, totalRating, director, writers, actors, release, runtime, genres, description} = movie.movieInfo;

  const detailTitles = {
    director: `Director`,
    writers: `Writers`,
    actors: `Actors`,
    date: `Release Date`,
    runtime: `Runtime`,
    country: `Country`,
    genres: genres.length > 1 ? `Genres` : `Genre`,
  };

  const fewWriters = writers.join(`, `);
  const fewActors = actors.join(`, `);
  const date = getReleaseDateFormat(release.date);
  const country = release.country;
  const runTimeFormat = getRuntimeFormat(runtime);
  const genresMarkup = getGenresInfoTemplate(genres);

  return (
    `<div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./${poster}" alt="">

          <p class="film-details__age">${ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${altTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tbody><tr class="film-details__row">
              <td class="film-details__term">${detailTitles.director}</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${detailTitles.writers}</td>
              <td class="film-details__cell">${fewWriters}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${detailTitles.actors}</td>
              <td class="film-details__cell">${fewActors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${detailTitles.date}</td>
              <td class="film-details__cell">${date}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${detailTitles.runtime}</td>
              <td class="film-details__cell">${runTimeFormat}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${detailTitles.country}</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
               <td class="film-details__term">${detailTitles.genres}</td>
               <td class="film-details__cell">${genresMarkup}</td>
            </tr>
          </tbody></table>

          <p class="film-details__film-description">
            ${description}
            </p>
        </div>
      </div>`
  );
};

const getMovieDetailsControlsTemplate = (movie) => {
  const cardControls = [
    {item: `Add to watchlist`, name: `watchlist`, check: movie.userDetails.isWatchlist},
    {item: `Already watched`, name: `watched`, check: movie.userDetails.isWatched},
    {item: `Add to favorites`, name: `favorite`, check: movie.userDetails.isFavorite}
  ];

  return cardControls.map(({item, name, check}) => {
    return (
      `<input type="checkbox" class="film-details__control-input visually-hidden" id="${name}" name="${name}" ${check ? `checked` : ``}>
       <label for="${name}" class="film-details__control-label film-details__control-label--${name}">${item}</label>`
    );
  }).join(``);
};

const getMovieDetailsTemplate = (movie) => {
  const infoMarkup = getMovieDetailsInfoTemplate(movie);
  const controlsMarkup = getMovieDetailsControlsTemplate(movie);
  const commentsSectionTemplate = new MovieComments(movie).getTemplate();

  return (
    `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            ${infoMarkup}
            <section class="film-details__controls">
              ${controlsMarkup}
            </section>
          </div>

          <div class="form-details__bottom-container">
            ${commentsSectionTemplate}
          </div>
        </form>
      </section>`
  );
};


export default class MovieDetails extends AbstractSmartComponent {
  constructor(movie) {
    super();

    this._movie = movie;
    this._element = this.getElement();

    this._onCloseMovieDetailsButtonClick = null;
    this._onWatchlistMovieControllerClick = null;
    this._onWatchedMovieControllerClick = null;
    this._onFavoriteMovieControllerClick = null;
    this._deleteButtonListener = null;
    this._setCommentListener = null;
    // TODO: реализация subscribeOnEvents

    this._setAddEmotionInNewComment();
    this.recoveryListeners();
  }

  getTemplate() {
    return getMovieDetailsTemplate(this._movie);
  }

  // rerender() {
  //   super.rerender();
  // }

  recoveryListeners() {
    this.setCloseButtonClickListener(this._onCloseMovieDetailsButtonClick);
    this.setAddWatchListClickListener(this._onWatchlistMovieControllerClick);
    this.setAddWatchedClickListener(this._onWatchedMovieControllerClick);
    this.setAddFavoriteClickListener(this._onFavoriteMovieControllerClick);
    this._setAddEmotionInNewComment();
    this.setDeleteCommentButtonClickListener(this._deleteButtonListener);
    this.setAddCommentListener(this._setCommentListener);
  }

  setCloseButtonClickListener(cb) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, cb);
  }

  setAddWatchListClickListener(cb) {
    this.getElement().querySelector(`#watchlist`).addEventListener(`click`, cb);
  }

  setAddWatchedClickListener(cb) {
    this.getElement().querySelector(`#watched`).addEventListener(`click`, cb);
  }

  setAddFavoriteClickListener(cb) {
    this.getElement().querySelector(`#favorite`).addEventListener(`click`, cb);
  }

  _setAddEmotionInNewComment() {
    // TODO: добавить проверку если нет комментариев?
    this._element.querySelector(`.film-details__emoji-list`).addEventListener(`change`, (evt) => {
      const emotionContainer = this._element.querySelector(`.film-details__add-emoji-label`);
      let emotionImg = emotionContainer.querySelector(`img`);

      if (!emotionImg) {
        emotionImg = document.createElement(`img`);
      }

      emotionImg.src = `./images/emoji/${evt.target.value}.png`;
      emotionImg.dataset.emotion = evt.target.value;
      emotionImg.width = 55;
      emotionImg.height = 55;
      emotionContainer.append(emotionImg);
    });
  }

  setDeleteCommentButtonClickListener(cb) {
    const deleteCommentButtons = Array.from(this.getElement().querySelectorAll(`.film-details__comment-delete`));
    if (deleteCommentButtons) {
      for (const deleteCommentButton of deleteCommentButtons) {
        deleteCommentButton.addEventListener(`click`, cb);
      }
    }

    this._deleteButtonListener = cb;
  }

  createNewComment() {
    const commentInputElement = this._element.querySelector(`.film-details__comment-input`);
    const emotionElement = this._element.querySelector(`.film-details__add-emoji-label`).firstElementChild;

    const id = String(Math.ceil(Math.random() * 10));
    const author = `Имя задаётся сервером`;
    const emotion = emotionElement ? emotionElement.dataset.emotion : ``;
    const comment = encode(commentInputElement.value);
    const date = +(new Date()) - Math.random() * 10 * 315360000;

    if (!emotion || !comment) {
      // TODO: не получилось добавить setCustomValidity(`Добавьте аватар`)
      return false;
    }

    return {id, author, comment, date, emotion};
  }

  resetAddComment() {
    // console.log(this._element); // null
    const commentInputElement = this._element.querySelector(`.film-details__comment-input`);
    commentInputElement.value = ``;
    const emotionElement = this._element.querySelector(`.film-details__add-emoji-label`).firstElementChild;

    if (emotionElement) {
      emotionElement.remove();
    }
  }

  setAddCommentListener(cb) {
    const commentInputElement = this.getElement().querySelector(`.film-details__comment-input`);
    commentInputElement.addEventListener(`keydown`, cb);

    this._setCommentListener = cb;
  }
}
