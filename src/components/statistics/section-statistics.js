import AbstractSmartComponent from "../abstract/abstract.js";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {getUserRank} from "../../utils/user-rank.js";
import {
  BAR_HEIGHT,
  STATISTIC_FILTER_NAMES,
} from "../../const.js";
import {
  getStatistics,
  getMoviesByStatistics
} from "../../utils/statistics.js";

import UserRankComponent from "./user-rank.js";
import StatisticFiltersComponent from "./statistic-filters.js";
import StatisticInfoListComponent from "./statistic-info-list.js";
import StatisticChartComponent from "./statistic-chart.js";

export default class SectionStatistics extends AbstractSmartComponent {
  constructor(moviesModel) {
    super();

    this._moviesModel = moviesModel.getMovies();
    this._movies = this._moviesModel;
    this._activeFilter = STATISTIC_FILTER_NAMES.ALL;
    this._moviesByFilter = [];

    this._userRank = null;
    this._userRankComponent = null;
    this._infoListComponent = null;

    this._chartComponent = new StatisticChartComponent();
    this._myChart = null;
    this._render();
  }

  getTemplate() {
    this._userRank = getUserRank(this._moviesModel);
    this._userRankComponent = new UserRankComponent(this._userRank);
    this._infoListComponent = new StatisticInfoListComponent(this._movies);
    this._filterComponent = new StatisticFiltersComponent(this._activeFilter);

    return (
      `<section class="statistic">
        ${this._userRankComponent.getTemplate()}
        ${this._filterComponent.getTemplate()}
        ${this._infoListComponent.getTemplate()}
        ${this._chartComponent.getTemplate()}
      </section>`
    );
  }

  _setFilterStatisticsChangeHandler() {
    this._onFilterStatisticsChange();
  }

  _onFilterStatisticsChange() {
    this.getElement().addEventListener(`change`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `INPUT`) {
        return;
      }

      const statisticsFilterName = evt.target.value;
      const periodDate = new Date();
      this._movies = this._moviesModel;

      const moviesByStatistics = getMoviesByStatistics(statisticsFilterName, this._movies,
          this._moviesByFilter, this._activeFilter, periodDate);

      this._movies = moviesByStatistics.moviesByFilter;
      this._activeFilter = moviesByStatistics.activeFilter;

      this._rerender();
      this._render();
    });
  }

  _rerender() {
    // super.rerender();
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this._recoveryListeners();
  }

  _render() {
    this._renderChart();
    this._setFilterStatisticsChangeHandler();
  }

  _recoveryListeners() {
    this._setFilterStatisticsChangeHandler();
  }

  _renderChart() {
    const movies = this._movies;
    const topGenresWithIndex = getStatistics(movies).topGenresWithIndex;
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    statisticCtx.height = BAR_HEIGHT * topGenresWithIndex.length;

    // TODO: ошибка ESLint
    this._myChart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: topGenresWithIndex.map((genre) => genre[0]),
        datasets: [{
          data: topGenresWithIndex.map((count) => count[1]),
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }
}
