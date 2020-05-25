import AbstractComponent from "../abstract/abstract.js";

export default class StatisticChart extends AbstractComponent {
  constructor() {
    super();

    this._chartWidth = `1000`;
  }

  getTemplate() {
    const chartWidth = this._chartWidth;

    return (
      `<div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="${chartWidth}"></canvas>
    </div>`
    );
  }
}
