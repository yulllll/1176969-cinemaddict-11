import {createElement} from "../utils.js";

class MovieNormalListTitle {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return (
      `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`
    );
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}

export {MovieNormalListTitle as default};
