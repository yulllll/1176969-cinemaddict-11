import AbstractComponent from "./abstract-component.js";

const createFilmsListExtraTemplate = (titleExtraList) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${titleExtraList}</h2>
      <div class="films-list__container"></div>
     </section>`
  );
};

class MovieExtraList extends AbstractComponent {
  constructor(title) {
    super();

    this._title = title;
  }

  getTemplate() {
    return createFilmsListExtraTemplate(this._title);
  }
}

export {MovieExtraList as default};
