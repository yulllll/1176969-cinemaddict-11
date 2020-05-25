import AbstractComponent from "./abstract/abstract.js";
import {FilterTypes} from "../const.js";
import {getFilterMoviesData} from "../utils/filters.js";


export default class Filters extends AbstractComponent {
  constructor(movies, activeType) {
    super();

    this._movies = movies;
    this._activeType = activeType;

    this._menuItems = [];
  }

  getTemplate() {
    this._menuItems = [
      {item: `All movies`, href: `all`, className: `item`, isActive: FilterTypes.ALL === this._activeType},
      {item: `Watchlist `, href: `watchlist`, className: `item`, isActive: FilterTypes.WATCHLIST === this._activeType, count: getFilterMoviesData(this._movies, FilterTypes.WATCHLIST).length},
      {item: `History `, href: `history`, className: `item`, isActive: FilterTypes.HISTORY === this._activeType, count: getFilterMoviesData(this._movies, FilterTypes.HISTORY).length},
      {item: `Favorites `, href: `favorites`, className: `item`, isActive: FilterTypes.FAVORITES === this._activeType, count: getFilterMoviesData(this._movies, FilterTypes.FAVORITES).length},
      {item: `Stats`, href: `stats`, className: `additional`}
    ];

    const copyMenuItems = this._menuItems.slice();
    // TODO: ?
    const allItem = copyMenuItems.splice(0, 1);
    const statsItem = copyMenuItems.splice(copyMenuItems.length - 1, 1);
    const filterItems = copyMenuItems;

    return (
      `<nav class="main-navigation">
        <div class="main-navigation__items">
            ${this._getMenuItems(allItem[0])}
            ${this._getFilterItems(filterItems)}
        </div>
            ${this._getMenuItems(statsItem[0])}
       </nav>`
    );
  }

  setFilterChangeListener(cb) {
    this.getElement().addEventListener(`click`, (evt) => {
      const filterType = evt.target.textContent.replace(/\d/g, ``).trim();
      cb(filterType);
    });
  }

  _getMenuItems(item) {

    return (
      `<a href="#${item.href}" class="main-navigation__${item.className} ${item.isActive ? `main-navigation__item--active` : ``}">${item.item}</a>`
    );
  }

  _getFilterItems(items) {
    // TODO: если у кинокарточки нет раздела = 0, то раздел
    //  не отрисовываем или лучше добавить класс - no-active
    return items.filter((item) => item.count).map((item) => {
      return (
        `<a href="#${item.href}" class="main-navigation__${item.className} ${item.isActive ? `main-navigation__item--active` : `222`}">${item.item}<span class="main-navigation__item-count">${item.count}</span></a>`
      );
    }).join(``);
  }
}
