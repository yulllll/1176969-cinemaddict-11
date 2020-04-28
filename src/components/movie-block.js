import {createElement} from "../utils.js";

const createFilmsBlockTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

class MovieBlock {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createFilmsBlockTemplate();
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

export {MovieBlock as default};
