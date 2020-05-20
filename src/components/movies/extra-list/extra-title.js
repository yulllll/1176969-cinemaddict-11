import AbstractComponent from "../../abstract/abstract.js";

export default class ExtraTitle extends AbstractComponent {
  constructor(title) {
    super();

    this._title = title;
  }

  getTemplate() {
    return (
      `<h2 class="films-list__title">${this._title}</h2>`
    );
  }
}
