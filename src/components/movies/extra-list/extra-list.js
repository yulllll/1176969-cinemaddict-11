import AbstractComponent from "../../abstract/abstract.js";

export default class ExtraList extends AbstractComponent {
  getTemplate() {
    return (
      `<section class="films-list--extra"></section>`
    );
  }
}
