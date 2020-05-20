import AbstractComponent from "../abstract/abstract.js";

export default class NoData extends AbstractComponent {
  getTemplate() {
    return (
      `<h2 class="films-list__title">There are no movies in our database</h2>`
    );
  }
}

