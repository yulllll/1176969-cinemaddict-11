import MovieDetailsComponent from "../components/modal/movie-details.js";
import MovieCardComponent from "../components/movies/movie-card";
import {remove, render, replace} from "../utils/render.js";
import {KEY_CODE, ModalMode} from "../const.js";
import MovieModel from "../models/movie-model.js";

export default class MovieController {
  constructor(container, onDataChange, onViewChange, api, onCommentChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._onCommentChange = onCommentChange;
    this._api = api;

    this._comments = null;
    this._movie = null;
    this._movieCardComponent = null;
    this.movieDetailsComponent = null;

    this.bodyElement = document.querySelector(`body`);

    this._openMovieDetails = this._openMovieDetails.bind(this);
    this._onCardPosterClick = this._onCardPosterClick.bind(this);
    this._onCardTitleClick = this._onCardTitleClick.bind(this);
    this._onCardCommentsClick = this._onCardCommentsClick.bind(this);
    this._onWatchlistMovieControllerClick = this._onWatchlistMovieControllerClick.bind(this);
    this._onWatchedMovieControllerClick = this._onWatchedMovieControllerClick.bind(this);
    this._onFavoriteMovieControllerClick = this._onFavoriteMovieControllerClick.bind(this);
    this.setDefaultView = this.setDefaultView.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._onCloseMovieDetailsKeydown = this._onCloseMovieDetailsKeydown.bind(this);

    this._modalMode = ModalMode.MODAL_HIDDEN;
  }

  setDefaultView() {
    if (this._modalMode === ModalMode.MODAL_OPEN) {
      remove(this.movieDetailsComponent);
    }
  }

  render(movie, comments) {
    this._movie = movie;
    this._comments = comments;

    const oldMovieCard = this._movieCardComponent;
    const oldMovieDetails = this.movieDetailsComponent;

    this._movieCardComponent = this._getMovieCardComponent(this._movie);
    this.movieDetailsComponent = this._getMovieDetailsComponent(this._movie, this._comments);

    render(this._container, this._movieCardComponent);

    if (oldMovieCard && oldMovieDetails) {
      replace(this._movieCardComponent, oldMovieCard);
      replace(this.movieDetailsComponent, oldMovieDetails);
    } else {
      render(this._container, this._movieCardComponent);
    }
  }

  getFilm() {
    return this._movieCardComponent.getFilmData();
  }

  destroy() {
    remove(this._movieCardComponent);
    document.removeEventListener(`keydown`, this._onCloseMovieDetailsKeydown);
  }

  _getMovieCardComponent(movie) {
    const movieCardComponent = new MovieCardComponent(movie);

    movieCardComponent.setCardPosterClickListener(this._onCardPosterClick);
    movieCardComponent.setCardTitleClickListener(this._onCardTitleClick);
    movieCardComponent.setCardCommentsClickListener(this._onCardCommentsClick);

    movieCardComponent.setAddWatchListClickListener((evt) => {
      evt.preventDefault();
      this._onWatchlistMovieControllerClick();
    });

    movieCardComponent.setAddWatchedClickListener((evt) => {
      evt.preventDefault();
      this._onWatchedMovieControllerClick();
    });
    movieCardComponent.setAddFavoriteClickListener((evt) => {
      evt.preventDefault();
      this._onFavoriteMovieControllerClick();
    });

    return movieCardComponent;
  }

  _onCardPosterClick() {
    this._openMovieDetails();
  }

  _onCardTitleClick() {
    this._openMovieDetails();
  }

  _onCardCommentsClick() {
    this._openMovieDetails();
  }

  _getMovieDetailsComponent(movie, comments) {
    const movieDetailsComponent = new MovieDetailsComponent(movie, comments);

    movieDetailsComponent.setCloseButtonClickListener(() => {
      this._onCloseMovieDetailsButtonClick(movieDetailsComponent);
    });

    movieDetailsComponent.setAddWatchListClickListener(() => {
      const modalElement = movieDetailsComponent.getElement();
      const modalElementScrollTop = modalElement.scrollTop;

      this._onWatchlistMovieControllerClick(modalElementScrollTop);
    });

    movieDetailsComponent.setAddWatchedClickListener(() => {
      const modalElement = movieDetailsComponent.getElement();
      const modalElementScrollTop = modalElement.scrollTop;

      this._onWatchedMovieControllerClick(modalElementScrollTop);
    });

    movieDetailsComponent.setAddFavoriteClickListener(() => {
      const modalElement = movieDetailsComponent.getElement();
      const modalElementScrollTop = modalElement.scrollTop;

      this._onFavoriteMovieControllerClick(modalElementScrollTop);
    });

    movieDetailsComponent.setDeleteCommentButtonClickListener((removeCommentId) => {
      const modalElement = movieDetailsComponent.getElement();
      const modalElementScrollTop = modalElement.scrollTop;

      movieDetailsComponent.disableDeleteButton();

      const newMovie = MovieModel.clone(this._movie);
      const newComments = this._comments.filter((comment) => comment.id !== removeCommentId);

      newMovie.comments = newMovie.comments.filter((commentId) => commentId !== removeCommentId);

      this._api.deleteComment(removeCommentId)
        .then(() => {
          this._onCommentChange(this, this._movie, newMovie, newComments, modalElementScrollTop);
        })
        .catch(() => {
          movieDetailsComponent.enableDeleteButton();
          movieDetailsComponent.shakeActiveDeleteComment();
        });
    });

    movieDetailsComponent.setAddNewCommentListener((newComment) => {
      const modalElement = movieDetailsComponent.getElement();
      const modalElementScrollTop = modalElement.scrollTop;

      if (newComment) {
        movieDetailsComponent.disableActiveTextCommentField();
        const newMovie = MovieModel.clone(this._movie);

        this._api.createComment(this._movie.id, newComment)
          .then((commentsData) => {
            newMovie.comments = commentsData.map((comment) => comment.id);
            this._onCommentChange(this, this._movie, newMovie, commentsData, modalElementScrollTop);
          })
          .catch(() => {
            movieDetailsComponent.setRedFrameTextCommentField();
            movieDetailsComponent.shake();
          });
      } else {
        movieDetailsComponent.setRedFrameTextCommentField();
        movieDetailsComponent.shake();
      }
    });

    return movieDetailsComponent;
  }

  _openMovieDetails() {
    this._onViewChange();
    this.movieDetailsComponent = this._getMovieDetailsComponent(this._movie, this._comments);
    render(this.bodyElement, this.movieDetailsComponent);
    this._modalMode = ModalMode.MODAL_OPEN;
    document.addEventListener(`keydown`, this._onCloseMovieDetailsKeydown);
  }

  _closePopup() {
    this._modalMode = ModalMode.MODAL_HIDDEN;
    const movieDetailsComponent = this.movieDetailsComponent;
    movieDetailsComponent.resetAddComment();
    remove(movieDetailsComponent);
    document.removeEventListener(`keydown`, this._onCloseMovieDetailsKeydown);
  }

  _onCloseMovieDetailsKeydown(evt) {
    const isPressEscape = evt.keyCode === KEY_CODE.ESCAPE;

    if (isPressEscape) {
      this._closePopup();
    }
  }

  _onCloseMovieDetailsButtonClick(movieDetailsComponent) {
    movieDetailsComponent.resetAddComment();
    remove(movieDetailsComponent);
    document.removeEventListener(`keydown`, this._onCloseMovieDetailsKeydown);
    this._modalMode = ModalMode.MODAL_HIDDEN;
  }

  _onWatchlistMovieControllerClick(elementScrollTop) {
    const newMovie = MovieModel.clone(this._movie);
    newMovie.userDetails.isWatchlist = !newMovie.userDetails.isWatchlist;

    this._onDataChange(this, this._movie, newMovie, elementScrollTop);
  }

  _onWatchedMovieControllerClick(elementScrollTop) {
    const newMovie = MovieModel.clone(this._movie);
    newMovie.userDetails.isWatched = !newMovie.userDetails.isWatched;

    this._onDataChange(this, this._movie, newMovie, elementScrollTop);
  }

  _onFavoriteMovieControllerClick(elementScrollTop) {
    const newMovie = MovieModel.clone(this._movie);
    newMovie.userDetails.isFavorite = !newMovie.userDetails.isFavorite;

    this._onDataChange(this, this._movie, newMovie, elementScrollTop);
  }
}
