import AbstractComponent from "../../abstract/abstract.js";

export default class NormalList extends AbstractComponent {
  getTemplate() {
    return `<section class="films-list"></section>`;
  }
}
