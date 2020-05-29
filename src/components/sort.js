import AbstractComponent from "./abstract/abstract-smart.js";
import {SortType} from "../const.js";

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getSortType() {
    return this._currentSortType;
  }

  resetSortToDefault() {
    const defaultSortButton = this.getElement().querySelector(`a[data-sort="default"]`);
    this._updateActiveClass(defaultSortButton);
  }

  setSortButtonClickListener(cb) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const target = evt.target;

      const sortButtonsElements = this.getElement().querySelectorAll(`.sort__button`);
      const isButton = target.tagName === `A`;
      const isContainsActiveClass = target.classList.contains(`sort__button--active`);

      if (isButton && !isContainsActiveClass) {
        sortButtonsElements
          .forEach((button) => button.classList.remove(`sort__button--active`));

        target.classList.add(`sort__button--active`);
      } else {
        return;
      }

      const sortType = target.dataset.sort;
      const isDatasetDefault = sortType === this._currentSortType;

      if (isDatasetDefault) {
        return;
      }

      this._currentSortType = sortType;
      cb(this._currentSortType);
    });
  }

  getTemplate() {
    return this._getSortTemplate(this._currentSortType);
  }

  _getSortTemplate(currentSortType) {
    return (
      `<ul class="sort">
        <li><a href="#" data-sort="${SortType.DEFAULT}" class="sort__button ${currentSortType === SortType.DEFAULT ? `sort__button--active` : ``}">Sort by default</a></li>
        <li><a href="#" data-sort="${SortType.SORT_DATE}" class="sort__button ${currentSortType === SortType.SORT_DATE ? `sort__button--active` : ``}">Sort by date</a></li>
        <li><a href="#" data-sort="${SortType.SORT_RATING}" class="sort__button" ${currentSortType === SortType.SORT_RATING ? `sort__button--active` : ``}>Sort by rating</a></li>
      </ul>`
    );
  }

  _updateActiveClass(activeButton) {
    const sortButtons = this.getElement().querySelectorAll(`.sort__button`);
    sortButtons.forEach((button) => {
      if (button.classList.contains(`sort__button--active`)) {
        button.classList.remove(`sort__button--active`);
      }
      activeButton.classList.add(`sort__button--active`);
    });
  }
}
