export default class MovieModel {
  constructor(data) {
    this.id = data[`id`];
    this.comments = data[`comments`];
    this.movieInfo = {
      title: data[`film_info`][`title`],
      altTitle: data[`film_info`][`alternative_title`],
      totalRating: data[`film_info`][`total_rating`],
      poster: data[`film_info`][`poster`],
      ageRating: data[`film_info`][`age_rating`],
      director: data[`film_info`][`director`],
      writers: data[`film_info`][`writers`],
      actors: data[`film_info`][`actors`],
      release: {
        date: new Date(data[`film_info`][`release`][`date`]),
        country: data[`film_info`][`release`][`release_country`],
      },
      runtime: data[`film_info`][`runtime`],
      genres: data[`film_info`][`genre`],
      description: data[`film_info`][`description`],
    };
    this.userDetails = {
      isWatchlist: Boolean(data[`user_details`][`watchlist`]),
      isWatched: Boolean(data[`user_details`][`already_watched`]),
      watchingDate: new Date(data[`user_details`][`watching_date`]),
      isFavorite: Boolean(data[`user_details`][`favorite`]),
    };
  }

  toRAW() {
    return {
      "id": this.id,
      "comments": this.comments,
      "film_info": {
        "title": this.movieInfo.title,
        "alternative_title": this.movieInfo.altTitle,
        "total_rating": this.movieInfo.totalRating,
        "poster": this.movieInfo.poster,
        "age_rating": this.movieInfo.ageRating,
        "director": this.movieInfo.director,
        "writers": this.movieInfo.writers,
        "actors": this.movieInfo.actors,
        "release": {
          "date": this.movieInfo.release.date,
          "release_country": this.movieInfo.release.country,
        },
        "runtime": this.movieInfo.runtime,
        "genre": this.movieInfo.genres,
        "description": this.movieInfo.description,
      },
      "user_details": {
        "watchlist": this.userDetails.isWatchlist,
        "already_watched": this.userDetails.isWatched,
        "watching_date": this.userDetails.watchingDate,
        "favorite": this.userDetails.isFavorite,
      },
    };
  }

  static parseFilm(data) {
    return new MovieModel(data);
  }

  static parseFilms(data) {
    return data.map(MovieModel.parseFilm);
  }

  static clone(data) {
    return new MovieModel(data.toRAW());
  }
}
