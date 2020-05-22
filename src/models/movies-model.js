import {FilterTypes} from "../const.js";
import {getFilterMoviesData} from "../utils/filters.js";

export default class MoviesModel {
  constructor() {
    this._movies = [];

    this._activeFilterType = FilterTypes.ALL;

    this._dataChangeListener = [];
    this._filterChangeListeners = [];
  }

  getMovies() {
    // return this._movies;
    return getFilterMoviesData(this._movies, this._activeFilterType);
  }

  // getFilterMovies() {
  //   return getFilterMoviesData(this._movies, this._activeFilterType);
  // }

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

  setFilterType(filterType) {
    this._activeFilterType = filterType;
    this._callListeners(this._filterChangeListeners);
  }

  setFilterDataChangeListener(cb) {
    this._filterChangeListeners.push(cb);
  }

  _callListeners(listeners) {
    listeners.forEach((listener) => listener());
  }
}
