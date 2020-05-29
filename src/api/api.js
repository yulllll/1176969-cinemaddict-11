import Comment from "../models/comment-model";
import Film from "../models/movie-model.js";
import {METHOD_RESPONSE_NAMES} from "../const.js";
import {checkResponseStatus} from "../utils/api.js";

export default class API {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getMovies() {
    return this._load({url: `movies`})
      .then(checkResponseStatus)
      .then((response) => response.json())
      .then(Film.parseFilms);
  }

  updateFilm(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: METHOD_RESPONSE_NAMES.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(Film.parseFilm);
  }

  getComments(id) {
    return this._load({url: `comments/${id}`})
      .then(checkResponseStatus)
      .then((response) => response.json())
      .then(Comment.parseComments);
  }

  deleteComment(commentId) {
    return this._load({url: `comments/${commentId}`, method: METHOD_RESPONSE_NAMES.DELETE,
    });
  }

  createComment(filmId, comment) {
    return this._load({
      url: `comments/${filmId}`,
      method: METHOD_RESPONSE_NAMES.POST,
      body: JSON.stringify(comment),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then((film) => Comment.parseComments(film.comments));
  }

  _load({url, method = METHOD_RESPONSE_NAMES.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkResponseStatus)
      .catch((err) => {
        throw err;
      });
  }
}
