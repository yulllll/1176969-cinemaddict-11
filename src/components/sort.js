import AbstractComponent from "./abstract.js";

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._sortItems = [`Sort by default`, `Sort by date`, `Sort by rating`];
  }

  _getSortListMarkup() {
    return this._sortItems.map((item, index) => {
      return (
        `<li>
            <a href="#" class="sort__button ${index === 0 ? `sort__button--active` : ``}">${item}</a>
        </li>`
      );
    }).join(``);
  }

  getTemplate() {
    return (
      `<ul class="sort">${this._getSortListMarkup()}</ul>`
    );
  }
}
