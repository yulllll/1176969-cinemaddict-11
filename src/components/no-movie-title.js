import AbstractComponent from "./abstract-component.js";

class NoMovieTitle extends AbstractComponent {
  getTemplate() {
    return (
      `<h2 class="films-list__title">There are no movies in our database</h2>`
    );
  }
}

export {NoMovieTitle as default};

