import AbstractComponent from "./abstract.js";

export default class FooterStatistics extends AbstractComponent {
  constructor(movies) {
    super();

    this._movies = movies;
  }

  getTemplate() {
    const moviesCount = String(this._movies.length).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1\u202f`);

    return (
      `<p>${moviesCount} movies inside</p>`
    );
  }
}
