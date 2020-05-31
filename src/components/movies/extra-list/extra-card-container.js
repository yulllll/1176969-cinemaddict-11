import AbstractComponent from "../../abstract/abstract.js";

export default class ExtraCardContainer extends AbstractComponent {
  getTemplate() {
    return (
      `<div class="films-list__container"></div>`
    );
  }
}
