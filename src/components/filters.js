import AbstractSmartComponent from "./abstract/abstract-smart";
import {FilterTypes} from "../const.js";
import {getFilterMoviesData} from "../utils/filters.js";

export default class Filters extends AbstractSmartComponent {
  constructor(movies, activeType) {
    super();

    this._movies = movies;
    this._activeType = activeType;
    this._menuItems = [];
    this._noActiveItem = null;

    this._onFilterChange = null;
  }

  recoveryListeners() {
    this.setFilterChangeListener(this._onFilterChange);
  }

  setFilterChangeListener(cb) {
    this.getElement().addEventListener(`click`, (evt) => {
      const targetFilterName = evt.target.textContent.replace(/\d/g, ``).trim();
      const isNoActiveItem = this._noActiveItem === targetFilterName;

      if (isNoActiveItem) {
        evt.preventDefault();
      }

      const filterType = evt.target.textContent.replace(/\d/g, ``).trim();
      cb(filterType);
    });

    this._onFilterChange = cb;
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

  _getMenuItems(item) {
    return (
      `<a href="#${item.href}" class="main-navigation__${item.className} ${item.isActive ? `main-navigation__item--active` : ``}">${item.item}</a>`
    );
  }

  _getFilterItems(items) {
    return items.map((item) => {
      let isActiveStatusClass = null;

      if (item.isActive) {
        isActiveStatusClass = `main-navigation__item--active`;
      } else if (!item.count) {
        isActiveStatusClass = `main-navigation__item--no-active`;
        this._noActiveItem = item.item.replace(/\d/g, ``).trim();
      } else {
        isActiveStatusClass = ``;
      }

      return (
        `<a ${item.count ? `href="#${item.href}"` : ``} class="main-navigation__${item.className} ${isActiveStatusClass}">${item.item}<span class="main-navigation__item-count">${item.count}</span></a>`
      );
    }).join(``);
  }
}
