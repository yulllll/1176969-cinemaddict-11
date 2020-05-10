import AbstractComponent from "./abstract-component.js";

class MovieNormalListContainer extends AbstractComponent {
  getTemplate() {
    return (
      `<div class="films-list__container"></div>`
    );
  }
}

export {MovieNormalListContainer as default};
