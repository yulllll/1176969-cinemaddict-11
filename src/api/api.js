import MovieModel from "../models/movie-model.js";
import CommentsModel from "../models/comments-model.js";

import {METHOD_RESPONSE_NAMES} from "../const.js";
import {checkResponseStatus} from "../utils/api.js";

export default class API {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getMovies() {
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then(MovieModel.parseMovies);
  }

  getComments(movieId) {
    return this._load({url: `comments/${movieId}`})
      .then((response) => response.json())
      .then((CommentsModel.parseComments));
  }

  updateMovie(id, movie) {
    // console.log(movie);
    return this._load({
      url: `movies/${id}`,
      method: METHOD_RESPONSE_NAMES.PUT,
      body: JSON.stringify(MovieModel.toRAW(movie)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(MovieModel.parseMovie);

    // console.log(`OK`);
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
