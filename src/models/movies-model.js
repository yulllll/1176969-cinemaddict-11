import {FilterTypes} from "../const.js";
import {getFilterMoviesData} from "../utils/filters.js";

export default class Movies {
  constructor() {
    this._films = [];

    this._activeFilterType = FilterTypes.ALL;

    this._dataChangeListener = [];
    this._filterChangeListeners = [];
  }

  getMovies() {
    return getFilterMoviesData(this._films, this._activeFilterType);
  }

  setMovies(movieData) {
    this._films = Array.from(movieData);

    this._callListeners(this._dataChangeListener);
  }

  updateFilm(id, film) {
    const index = this._films.findIndex((filmItem) => filmItem.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));
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
