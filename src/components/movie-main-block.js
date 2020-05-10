import AbstractComponent from "./abstract-component.js";

class MovieMainBlock extends AbstractComponent {
  getTemplate() {
    return (
      `<section class="films"></section>`
    );
  }
}

export {MovieMainBlock as default};
