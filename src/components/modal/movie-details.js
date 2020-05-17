import AbstractComponent from "../abstract.js";

export default class MovieDetails extends AbstractComponent {
  constructor(movie) {
    super();

    this._movie = movie;
    this._commentsLength = this._movie.comments.length;
    this._movieControls = [
      {item: `Add to watchlist`, name: `watchlist`, check: this._movie.userDetails.isWatchlist},
      {item: `Already watched`, name: `watched`, check: this._movie.userDetails.isWatched},
      {item: `Add to favorites`, name: `favorite`, check: this._movie.userDetails.isFavorite}
    ];
  }

  _getGenresTemplate(genres) {
    return genres.map((genre) => {
      return (
        `<span class="film-details__genre">${genre}</span>`
      );
    }).join(``);
  }

  _getGenreTemplate(genres) {
    const title = genres.length > 1 ? `Genres` : `Genre`;

    return `<td class="film-details__term">${title}</td>
              <td class="film-details__cell">${this._getGenresTemplate(genres)}</td>`;
  }

  _getInfoTemplate() {
    const {poster, ageRating, title, altTitle, totalRating, director, writers, actors, release, runtime, genres, description} = this._movie.movieInfo;


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
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${release.date}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${release.country}</td>
            </tr>
            <tr class="film-details__row">
              ${this._getGenreTemplate(genres)}
            </tr>
          </tbody></table>

          <p class="film-details__film-description">
            ${description}
            </p>
        </div>
      </div>`
    );
  }

  _getControlsTemplate() {
    return this._movieControls.map(({item, name, check}) => {
      return (
        `<input type="checkbox" class="film-details__control-input visually-hidden" id="${name}" name="${name}" ${check ? `checked` : ``}>
       <label for="${name}" class="film-details__control-label film-details__control-label--${name}">${item}</label>`
      );
    }).join(``);
  }

  _getCommentsTemplate() {
    return this._movie.comments.map(({emotion, comment, author, date}) => {
      return (
        `<li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
              </span>
              <div>
                <p class="film-details__comment-text">${comment}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${author}</span>
                  <span class="film-details__comment-day">${date}</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>`
      );
    }).join(``);
  }

  setCloseButtonClickListener(cb) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, cb);
  }

  getTemplate() {
    return (
      `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            ${this._getInfoTemplate()}
            <section class="film-details__controls">
              ${this._getControlsTemplate()}
            </section>
          </div>

          <div class="form-details__bottom-container">
            <section class="film-details__comments-wrap">
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._commentsLength}</span></h3>
              <ul class="film-details__comments-list">
                  ${this._getCommentsTemplate()}
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
  }
}
