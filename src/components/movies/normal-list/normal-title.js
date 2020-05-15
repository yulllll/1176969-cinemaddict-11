import AbstractComponent from "../../abstract.js";

export default class NormalTitle extends AbstractComponent {
  getTemplate() {
    return `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`;
  }
}
