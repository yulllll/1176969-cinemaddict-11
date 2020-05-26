import AbstractComponent from "../abstract/abstract.js";
import {LIST_TITLES} from "../../const.js";
import {getStatistics} from "../../utils/statistics.js";

export default class StatisticInfoList extends AbstractComponent {
  constructor(moviesData) {
    super();

    this._movies = moviesData;
    this._listTitles = LIST_TITLES;
  }

  getTemplate() {
    return (
      `<ul class="statistic__text-list">
        ${this._getInfoListMarkup(this._movies)}
    </ul>`
    );
  }

  _getInfoListMarkup(movies) {
    const listTitle = this._listTitles;

    const watchListLength = getStatistics(movies).watchListLength !== 0 ? getStatistics(movies).watchListLength : `0`;
    const moviesListTitleEnding = watchListLength === 1 ? `movie` : `movies`;
    const allRuntimeHours = getStatistics(movies).allRuntimeHours !== 0 ? getStatistics(movies).allRuntimeHours : `0`;
    const allRuntimeMinutes = getStatistics(movies).allRuntimeMinutes > 0 ? getStatistics(movies).allRuntimeMinutes : `0`;
    const topGenre = getStatistics(movies).topGenre ? getStatistics(movies).topGenre : ``;

    return (
      `<li class="statistic__text-item">
        <h4 class="statistic__item-title">${listTitle.WATCHED}</h4>
        <p class="statistic__item-text">${watchListLength} <span class="statistic__item-description">${moviesListTitleEnding}</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">${listTitle.DURATION}</h4>
        <p class="statistic__item-text">
            ${allRuntimeHours} <span class="statistic__item-description">h</span>
            ${allRuntimeMinutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">${listTitle.GENRE}</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>`
    );
  }
}
