export default class Comments {
  constructor() {
    this._comments = {};

    this._dataChangeListener = [];
  }

  getComments() {
    return this._comments;
  }

  setComments(filmId, comments) {
    this._comments[filmId] = comments;
    this._callHandlers(this._dataChangeListener);
  }

  updateComments(filmId, comments) {
    this._comments[filmId] = comments;
    return true;
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
