import AbstractComponent from "../abstract.js";

export default class Container extends AbstractComponent {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}
