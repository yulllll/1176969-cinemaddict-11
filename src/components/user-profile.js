import AbstractComponent from "./abstract.js";
import {getMarkCount} from "../utils/common";

export default class UserProfile extends AbstractComponent {
  constructor(movies) {
    super();

    this._userRank = null;
    this._ranks = [``, `Novice`, `Fan`, `Movie Buff`];
    this._movies = movies;
    this._watchedPath = `userDetails.isWatched`;
  }

  _getUserRating() {
    const userWatchedCount = getMarkCount(this._movies, this._watchedPath);
    if (userWatchedCount > 1 && userWatchedCount <= 10) {
      this._userRank = this._ranks[1];
    } else if (userWatchedCount > 10 && userWatchedCount <= 20) {
      this._userRank = this._ranks[2];
    } else if (userWatchedCount > 20) {
      this._userRank = this._ranks[3];
    } else {
      this._userRank = this._ranks[0];
    }

    return this._userRank;
  }

  getTemplate() {
    return (
      `<section class="header__profile profile">
      <p class="profile__rating">${this._getUserRating()}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
     </section>`
    );
  }
}
