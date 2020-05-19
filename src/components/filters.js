import AbstractComponent from "./abstract.js";
import {getControlsCount} from "../utils/common.js";

export const ControlsPath = {
  WATCHLIST: `userDetails.isWatchlist`,
  WATCHED: `userDetails.isWatched`,
  FAVORITE: `userDetails.isFavorite`,
};

const menuItems = [
  {item: `All movies`, href: `all`, className: `item`, isActive: true},
  {item: `Stats`, href: `stats`, className: `additional`}
];

export default class Filters extends AbstractComponent {
  constructor(movies) {
    super();

    this._movies = movies;
    this._filterItems = [
      {item: `Watchlist `, href: `watchlist`, className: `item`, count: getControlsCount(this._movies, ControlsPath.WATCHLIST)},
      {item: `History `, href: `history`, className: `item`, count: getControlsCount(this._movies, ControlsPath.WATCHED)},
      {item: `Favorites `, href: `favorites`, className: `item`, count: getControlsCount(this._movies, ControlsPath.FAVORITE)}
    ];
  }

  getTemplate() {
    return (
      `<nav class="main-navigation">
        <div class="main-navigation__items">
            ${this._getMenuItems(menuItems[0])}
            ${this._getFilterItems()}
        </div>
            ${this._getMenuItems(menuItems[1])}
       </nav>`
    );
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
}
