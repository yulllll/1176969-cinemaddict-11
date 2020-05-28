export default class MovieModel {
  constructor(movie) {
    this.id = movie[`id`];
    this.comments = movie[`comments`];
    this.movieInfo = {
      title: movie[`film_info`][`title`],
      altTitle: movie[`film_info`][`alternative_title`],
      totalRating: movie[`film_info`][`total_rating`],
      poster: movie[`film_info`][`poster`],
      ageRating: movie[`film_info`][`age_rating`],
      director: movie[`film_info`][`director`],
      writers: movie[`film_info`][`writers`],
      actors: movie[`film_info`][`actors`],
      release: {
        date: new Date(movie[`film_info`][`release`][`date`]),
        country: movie[`film_info`][`release`][`release_country`],
      },
      runtime: movie[`film_info`][`runtime`],
      genres: movie[`film_info`][`genre`],
      description: movie[`film_info`][`description`],
    };
    this.userDetails = {
      isWatchlist: Boolean(movie[`user_details`][`watchlist`]),
      isWatched: Boolean(movie[`user_details`][`already_watched`]),
      watchingDate: new Date(movie[`user_details`][`watching_date`]),
      isFavorite: Boolean(movie[`user_details`][`watchlist`]),
    };
  }

  static toRAW(movie) {
    return {
      "id": this.id,
      "comments": movie.comments,
      "film_info": {
        "title": movie.movieInfo.title,
        "alternative_title": movie.movieInfo.altTitle,
        "total_rating": movie.movieInfo.totalRating,
        "poster": movie.movieInfo.poster,
        "age_rating": movie.movieInfo.ageRating,
        "director": movie.movieInfo.director,
        "writers": movie.movieInfo.writers,
        "actors": movie.movieInfo.actors,
        "release": {
          "date": movie.movieInfo.release.date,
          "release_country": movie.movieInfo.release.country
        },
        "runtime": movie.movieInfo.runtime,
        "genre": movie.movieInfo.genres,
        "description": movie.movieInfo.description,
      },
      "user_details": {
        "watchlist": movie.userDetails.isWatchlist,
        "already_watched": movie.userDetails.isWatched,
        "watching_date": movie.userDetails.watchingDate,
        "favorite": movie.userDetails.isFavorite
      }
    };
  }


  static parseMovie(movie) {
    return new MovieModel(movie);
  }

  static parseMovies(movies) {
    return movies.map(MovieModel.parseMovie);
  }
}
