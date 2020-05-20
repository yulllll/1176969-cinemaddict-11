import AbstractSmartComponent from "../abstract/abstract-smart.js";
import {
  getReleaseDateFormat,
  getRuntimeFormat,
  getCommentTime,
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
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

          <p class="film-details__age">${ageRating}</p>
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

const getMovieDetailsCommentsTemplate = (movie) => {
  return movie.comments.map(({emotion, comment, author, date}) => {
    const commentsTime = getCommentTime(date);

    return (
      `<li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
              </span>
              <div>
                <p class="film-details__comment-text">${comment}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${author}</span>
                  <span class="film-details__comment-day">${commentsTime}</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>`
    );
  }).join(``);
};

const getMovieDetailsTemplate = (movie) => {
  const infoMarkup = getMovieDetailsInfoTemplate(movie);
  const controlsMarkup = getMovieDetailsControlsTemplate(movie);
  const commentsMarkup = getMovieDetailsCommentsTemplate(movie);
  const commentsLength = movie.comments.length;

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
            <section class="film-details__comments-wrap">
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">
                ${commentsLength}
                </span></h3>
              <ul class="film-details__comments-list">
                  ${commentsMarkup}
              </ul>

              <div class="film-details__new-comment">
                <div for="add-emoji" class="film-details__add-emoji-label"></div>

                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                </label>

                <div class="film-details__emoji-list">
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                  <label class="film-details__emoji-label" for="emoji-smile">
                    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                  <label class="film-details__emoji-label" for="emoji-sleeping">
                    <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                  <label class="film-details__emoji-label" for="emoji-puke">
                    <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                  <label class="film-details__emoji-label" for="emoji-angry">
                    <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                  </label>
                </div>
              </div>
            </section>
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
    this._setAddEmotionInNewComment();
    // TODO: реализация subscribeOnEvents
  }

  getTemplate() {
    return getMovieDetailsTemplate(this._movie);
  }

  recoveryListeners() {
    this.setCloseButtonClickListener(this._onCloseMovieDetailsButtonClick);
    this.setAddWatchListClickListener(this._onWatchlistMovieControllerClick);
    this.setAddWatchedClickListener(this._onWatchedMovieControllerClick);
    this.setAddFavoriteClickListener(this._onFavoriteMovieControllerClick);
    this._setAddEmotionInNewComment();
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
      emotionImg.width = 55;
      emotionImg.height = 55;
      emotionContainer.append(emotionImg);
    });
  }
}
