import AbstractSmartComponent from "../abstract/abstract-smart.js";
import MovieComments from "./movie-comments.js";
import {encode} from "he";
import {shaking} from "../../utils/animation.js";
import {getReleaseDateFormat, getRuntimeFormat} from "../../utils/date.js";
import {COMMENT_BUTTON_STATUS, KEY_CODE} from "../../const.js";

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

const getMovieDetailsTemplate = (movie, comments) => {
  const infoMarkup = getMovieDetailsInfoTemplate(movie);
  const controlsMarkup = getMovieDetailsControlsTemplate(movie);
  const commentsSectionTemplate = new MovieComments(movie, comments).getTemplate();

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
  constructor(movie, comments) {
    super();

    this._movie = movie;
    this._comments = comments;

    this._element = this.getElement();

    this._onCloseMovieDetailsButtonClick = null;
    this._onWatchlistMovieControllerClick = null;
    this._onWatchedMovieControllerClick = null;
    this._onFavoriteMovieControllerClick = null;
    // this._deleteButtonListener = null;
    // this._setCommentListener = null;
    this._activeDeleteCommentButton = null;
    this._activeDeleteComment = null;
    this._activeTextCommentField = null;
    // this._deleteCommentButtonClickListener = null;
    // this._addNewCommentListener = null;

    this._setAddEmotionInNewComment();
    this.recoveryListeners();
  }

  getTemplate() {
    return getMovieDetailsTemplate(this._movie, this._comments);
  }

  recoveryListeners() {
    this.setCloseButtonClickListener(this._onCloseMovieDetailsButtonClick);
    this.setAddWatchListClickListener(this._onWatchlistMovieControllerClick);
    this.setAddWatchedClickListener(this._onWatchedMovieControllerClick);
    this.setAddFavoriteClickListener(this._onFavoriteMovieControllerClick);
    // this.setDeleteCommentButtonClickListener(this._deleteCommentButtonClickListener);
    // this.setAddNewCommentListener(this._addNewCommentListener);
    this._setAddEmotionInNewComment();
  }

  setCloseButtonClickListener(cb) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, cb);
    this._onCloseMovieDetailsButtonClick = cb;
  }

  setAddWatchListClickListener(cb) {
    this.getElement().querySelector(`#watchlist`).addEventListener(`click`, cb);
    this._onWatchlistMovieControllerClick = cb;
  }

  setAddWatchedClickListener(cb) {
    this.getElement().querySelector(`#watched`).addEventListener(`click`, cb);
    this._onWatchedMovieControllerClick = cb;
  }

  setAddFavoriteClickListener(cb) {
    this.getElement().querySelector(`#favorite`).addEventListener(`click`, cb);
    this._onFavoriteMovieControllerClick = cb;
  }

  setDeleteCommentButtonClickListener(cb) {
    const deleteCommentsButtons = this._element.querySelectorAll(`.film-details__comment-delete`);

    if (deleteCommentsButtons) {
      Array.from(deleteCommentsButtons).forEach((button) => button.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._activeDeleteCommentButton = button;
        this._activeDeleteComment = button.closest(`.film-details__comment`);
        const activeDeleteCommentId = this._activeDeleteComment.id;

        cb(activeDeleteCommentId);
      }));
    }

    // this._deleteCommentButtonClickListener = cb;
  }

  setAddNewCommentListener(cb) {
    const textCommentElement = this.getElement().querySelector(`.film-details__comment-input`);

    textCommentElement.addEventListener(`keydown`, (evt) => {
      const isEnterAndCtrl = evt.keyCode === KEY_CODE.ENTER && evt.ctrlKey;
      this._activeTextCommentField = textCommentElement;
      if (isEnterAndCtrl) {
        const newComment = this._getNewComment();

        cb(newComment);
      }
    });

    // this._addNewCommentListener = cb;
  }

  resetAddComment() {
    const commentInputElement = this._element.querySelector(`.film-details__comment-input`);
    commentInputElement.value = ``;
    const emotionElement = this._element.querySelector(`.film-details__add-emoji-label`).firstElementChild;

    if (emotionElement) {
      emotionElement.remove();
    }
  }

  enableDeleteButton() {
    this._activeDeleteCommentButton.disabled = false;
    this._activeDeleteCommentButton.textContent = COMMENT_BUTTON_STATUS.DELETE;
  }

  disableDeleteButton() {
    this._activeDeleteCommentButton.disabled = true;
    this._activeDeleteCommentButton.textContent = COMMENT_BUTTON_STATUS.DELETING;
  }

  disableActiveTextCommentField() {
    this._activeTextCommentField.disabled = true;
  }

  setRedFrameTextCommentField() {
    this._activeTextCommentField.style.border = `1px solid red`;
  }

  shake() {
    shaking(this.getElement());
  }

  shakeActiveDeleteComment() {
    shaking(this._activeDeleteComment);
  }

  _getNewComment() {
    const commentInputElement = this._element.querySelector(`.film-details__comment-input`);
    const emotionElement = this._element.querySelector(`.film-details__add-emoji-label`).firstElementChild;

    const comment = encode(commentInputElement.value);
    const emotion = emotionElement.dataset.emotion;
    const date = new Date();

    if (!emotion || !comment) {
      return null;
    }

    return {
      comment,
      date,
      emotion,
    };
  }

  _setAddEmotionInNewComment() {
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
}
