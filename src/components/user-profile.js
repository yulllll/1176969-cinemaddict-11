import AbstractComponent from "./abstract/abstract.js";
import {getUserRank} from "../utils/user-rank.js";

export default class UserProfile extends AbstractComponent {
  constructor(movies) {
    super();

    this._movies = movies;
  }

  getTemplate() {
    const userRank = getUserRank(this._movies);

    return (
      `<section class="header__profile profile">
      <p class="profile__rating">${userRank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
     </section>`
    );
  }
}
