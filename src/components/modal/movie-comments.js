import {getCommentTime} from "../../utils/date.js";
import {EMOTION_NAMES} from "../../const.js";
import AbstractSmartComponent from "../abstract/abstract-smart";

const getUserCommentsTemplate = (movie) => {
  return movie.comments.map(({id, emotion, comment, author, date}) => {
    const commentsTime = date ? getCommentTime(date) : ``;
    const commentsEmotionSrc = emotion ? `./images/emoji/${emotion}.png` : ``;
    const commentsEmotionAlt = emotion ? `emoji-${emotion}` : ``;

    return (
      `<li id="${id}" class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="${commentsEmotionSrc}" width="55" height="55" alt="${commentsEmotionAlt}">
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

const getNewCommentsTemplate = (emotions) => {
  return emotions.map((emotion) => {
    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}">
       <label class="film-details__emoji-label" for="emoji-${emotion}">
         <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
       </label>`
    );
  }).join(`\n`);
};

const getMovieCommentsTemplate = (movie) => {
  const movieCommentsLength = movie.comments.length;
  const userCommentsMarkup = getUserCommentsTemplate(movie);
  const newCommentsMarkup = getNewCommentsTemplate(EMOTION_NAMES);

  return (
    `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${movieCommentsLength}</span></h3>

        <ul class="film-details__comments-list">
            ${userCommentsMarkup}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            ${newCommentsMarkup}
          </div>
        </div>
      </section>`
  );
};

export default class MovieComments extends AbstractSmartComponent {
  constructor(movie) {
    super();

    this._movie = movie;
    this._element = this.getElement();
  }

  getTemplate() {
    return getMovieCommentsTemplate(this._movie);
  }
}
