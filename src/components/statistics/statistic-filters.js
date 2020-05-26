import AbstractComponent from "../abstract/abstract.js";
import {STATISTIC_FILTER_NAMES} from "../../const.js";

export default class StatisticFilters extends AbstractComponent {
  constructor(checked) {
    super();

    this._checked = checked;
  }

  getTemplate() {
    return (
      `<form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${this._checked === STATISTIC_FILTER_NAMES.ALL ? `checked=""` : ``}>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${this._checked === STATISTIC_FILTER_NAMES.TODAY ? `checked=""` : ``}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${this._checked === STATISTIC_FILTER_NAMES.WEEK ? `checked=""` : ``}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${this._checked === STATISTIC_FILTER_NAMES.MONTH ? `checked=""` : ``}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${this._checked === STATISTIC_FILTER_NAMES.YEAR ? `checked=""` : ``}>
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>`
    );
  }
}
