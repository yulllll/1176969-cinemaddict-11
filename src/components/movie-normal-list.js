import AbstractComponent from "./abstract-component.js";

class MovieNormalList extends AbstractComponent {
  getTemplate() {
    return (
      `<section class="films-list"></section>`
    );
  }
}

export {MovieNormalList as default};
