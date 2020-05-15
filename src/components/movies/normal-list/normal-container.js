import AbstractComponent from "../../abstract.js";

export default class NormalContainer extends AbstractComponent {
  getFilmCardCount() {
    return this.getElement().querySelectorAll(`.film-card`).length;
  }

  getTemplate() {
    return `<div class="films-list__container"></div>`;
  }
}
