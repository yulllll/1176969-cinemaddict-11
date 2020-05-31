import AbstractComponent from "../abstract/abstract.js";
import {StatisticsInfoListTitles} from "../../const.js";
import {getStatistics} from "../../utils/statistics.js";

export default class StatisticInfoList extends AbstractComponent {
  constructor(moviesData) {
    super();

    this._movies = moviesData;
    this._infolistTitles = StatisticsInfoListTitles;
  }

  getTemplate() {
    return (
      `<ul class="statistic__text-list">
        ${this._getInfoListMarkup(this._movies)}
    </ul>`
    );
  }

  _getInfoListMarkup(movies) {
    const infolistTitles = this._infolistTitles;

    const watchedMoviesLength = getStatistics(movies).watchedMoviesLength !== 0 ? getStatistics(movies).watchedMoviesLength : `0`;
    const moviesListTitleEnding = watchedMoviesLength === 1 ? `movie` : `movies`;
    const allRuntimeHours = getStatistics(movies).allRuntimeHours !== 0 ? getStatistics(movies).allRuntimeHours : `0`;
    const allRuntimeMinutes = getStatistics(movies).allRuntimeMinutes > 0 ? getStatistics(movies).allRuntimeMinutes : `0`;
    const topGenre = getStatistics(movies).topGenre ? getStatistics(movies).topGenre : ``;

    return (
      `<li class="statistic__text-item">
        <h4 class="statistic__item-title">${infolistTitles.WATCHED}</h4>
        <p class="statistic__item-text">${watchedMoviesLength} <span class="statistic__item-description">${moviesListTitleEnding}</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">${infolistTitles.DURATION}</h4>
        <p class="statistic__item-text">
            ${allRuntimeHours} <span class="statistic__item-description">h</span>
            ${allRuntimeMinutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">${infolistTitles.GENRE}</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>`
    );
  }
}
