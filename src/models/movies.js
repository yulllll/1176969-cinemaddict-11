export default class Movies {
  constructor() {
    this._movies = [];

    this._dataChangeListener = [];
  }

  getMovies() {
    return this._movies;
  }

  setMovies(movieData) {
    this._movies = Array.from(movieData);

    this._callListeners(this._dataChangeListener);
  }

  updateMovies(id, movie) {
    const index = this._movies.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index),
        movie,
        this._movies.slice(index + 1));

    this._callListeners(this._dataChangeListener);

    return true;
  }

  _callListeners(listeners) {
    listeners.forEach((listener) => listener());
  }
}
