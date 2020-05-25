import AbstractComponent from "../abstract/abstract";

export default class UserRank extends AbstractComponent {
  constructor(rank) {
    super();

    this._rank = rank;
    this._title = `Your rank`;
    this._avatarSrc = `images/bitmap@2x.png`;
  }

  getTemplate() {
    return (
      `<p class="statistic__rank">${this._title}
      <img class="statistic__img" src="${this._avatarSrc}" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${this._rank}</span>
    </p>`
    );
  }
}
