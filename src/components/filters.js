import AbstractComponent from "./abstract.js";
import {getMarkCount} from "../utils/common.js";

export default class Filters extends AbstractComponent {
  constructor(movies) {
    super();

    this._movies = movies;
    this._watchlistPath = `userDetails.isWatchlist`;
    this._watchedPath = `userDetails.isWatched`;
    this._favoritePath = `userDetails.isFavorite`;
    this._menuItems = [
      {item: `All movies`, href: `all`, className: `item`, isActive: true},
      {item: `Stats`, href: `stats`, className: `additional`}
    ];
    this._filterItems = [
      {item: `Watchlist `, href: `watchlist`, className: `item`, count: getMarkCount(this._movies, this._watchlistPath)},
      {item: `History `, href: `history`, className: `item`, count: getMarkCount(this._movies, this._watchedPath)},
      {item: `Favorites `, href: `favorites`, className: `item`, count: getMarkCount(this._movies, this._favoritePath)}
    ];
  }

  _getMenuItems(item) {
    return (
      `<a href="#${item.href}" class="main-navigation__${item.className} ${item.isActive ? `main-navigation__item--active` : ``}">${item.item}</a>`
    );
  }

  _getFilterItems() {
    return this._filterItems.map((item) => {
      return (
        `<a href="#${item.href}" class="main-navigation__${item.className}">${item.item}<span class="main-navigation__item-count">${item.count}</span></a>`
      );
    }).join(``);
  }

  getTemplate() {
    return (
      `<nav class="main-navigation">
        <div class="main-navigation__items">
            ${this._getMenuItems(this._menuItems[0])}
            ${this._getFilterItems()}
        </div>
            ${this._getMenuItems(this._menuItems[1])}
       </nav>`
    );
  }
}
