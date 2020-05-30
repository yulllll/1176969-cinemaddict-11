import AbstractComponent from "./abstract/abstract.js";

export default class FooterStatistics extends AbstractComponent {
  constructor() {
    super();

    this._movies = null;
  }

  setMovies(movies) {
    this._movies = movies;
  }

  getTemplate() {
    const moviesCount = this._movies ?
      String(this._movies.length)
        .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1\u202f`)
      : `0`;

    return (
      `<p>${moviesCount} movies inside</p>`
    );
  }
}
