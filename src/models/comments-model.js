export default class CommentsMovel {
  constructor() {
    this._comments = [];

    this._dataChangeListener = [];
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = Array.from(comments);
    this._callListeners(this._dataChangeListener);
  }

  updateMovies(id, comment) {
    const index = this._comments.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), comment, this._comments.slice(index + 1));

    this._callListeners(this._dataChangeListener);

    return true;
  }

  _callListeners(listeners) {
    listeners.forEach((listener) => listener());
  }
}
