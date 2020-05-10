import AbstractComponent from "./abstract-component.js";

class MovieLoadMoreButton extends AbstractComponent {
  getTemplate() {
    return (
      `<button class="films-list__show-more">Show more</button>`
    );
  }
}

export {MovieLoadMoreButton as default};
