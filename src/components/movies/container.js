import AbstractComponent from "../abstract/abstract.js";

export default class Container extends AbstractComponent {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}
