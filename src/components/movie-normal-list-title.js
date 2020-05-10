import AbstractComponent from "./abstract-component.js";

class MovieNormalListTitle extends AbstractComponent {
  getTemplate() {
    return (
      `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`
    );
  }
}

export {MovieNormalListTitle as default};
