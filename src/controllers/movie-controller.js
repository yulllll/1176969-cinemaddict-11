import MovieDetailsComponent from "../components/modal/movie-details.js";
import MovieCardComponent from "../components/movies/movie-card";
import {remove, render, replace} from "../utils/render";
import {KeyCode} from "../utils/common";
import {ModalMode} from "../const.js";


export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._movie = null;
    this._movieCardComponent = null;
    this.movieDetailsComponent = null;

    this.bodyElement = document.querySelector(`body`);

    this._openMovieDetails = this._openMovieDetails.bind(this);

    this._onCardPosterClick = this._onCardPosterClick.bind(this);
    this._onCardTitleClick = this._onCardTitleClick.bind(this);
    this._onCardCommentsClick = this._onCardCommentsClick.bind(this);
    // TODO:
    // this._onCloseMovieDetailsKeydown = this._onCloseMovieDetailsKeydown.bind(this);
    // this._onCloseMovieDetailsButtonClick = this._onCloseMovieDetailsButtonClick.bind(this);

    this._onWatchlistMovieControllerClick = this._onWatchlistMovieControllerClick.bind(this);
    this._onWatchedMovieControllerClick = this._onWatchedMovieControllerClick.bind(this);
    this._onFavoriteMovieControllerClick = this._onFavoriteMovieControllerClick.bind(this);
    this.setDefaultView = this.setDefaultView.bind(this);

    this._modalMode = ModalMode.MODAL_HIDDEN;
  }

  setDefaultView() {
    if (this._modalMode === ModalMode.MODAL_OPEN) {
      remove(this.movieDetailsComponent);
    }
  }


  render(movie) {
    this._movie = movie;

    const oldMovieCard = this._movieCardComponent;
    const oldMovieDetails = this.movieDetailsComponent;

    this._movieCardComponent = this._getMovieCardComponent(this._movie);
    this.movieDetailsComponent = this._getMovieDetailsComponent(this._movie);

    render(this._container, this._movieCardComponent);


    // this.movieDetailsComponent.setAddCommentListener((evt) => {
    //   const isEnterAndCtrl = evt.key === `Enter` && evt.ctrlKey;
    //   if (isEnterAndCtrl) {
    //     const newComment = this.movieDetailsComponent.createNewComment();
    //     if (!newComment) {
    //       return;
    //     }
    //     newComment.movieId = movie.id;
    //     const newComments = movie.comments.concat(newComment);
    //     this._onDataChange(this, movie, Object.assign(movie, {comments: newComments}));
    //   }
    // });


    if (oldMovieCard && oldMovieDetails) {
      replace(this._movieCardComponent, oldMovieCard);
      replace(this.movieDetailsComponent, oldMovieDetails);
    } else {
      render(this._container, this._movieCardComponent);
    }
  }

  destroy() {
    remove(this._movieCardComponent);
    document.removeEventListener(`keydown`, this._onCloseMovieDetailsKeydown);
  }

  _openMovieDetails() {
    this.movieDetailsComponent = this._getMovieDetailsComponent(this._movie);

    render(this.bodyElement, this.movieDetailsComponent);

    this._onViewChange();

    this._modalMode = ModalMode.MODAL_OPEN;
  }

  _getMovieCardComponent(movie) {
    const movieCardComponent = new MovieCardComponent(movie);

    movieCardComponent.setCardPosterClickListener(this._onCardPosterClick);
    movieCardComponent.setCardTitleClickListener(this._onCardTitleClick);
    movieCardComponent.setCardCommentsClickListener(this._onCardCommentsClick);

    movieCardComponent.setAddWatchListClickListener(this._onWatchlistMovieControllerClick);
    movieCardComponent.setAddWatchedClickListener(this._onWatchedMovieControllerClick);
    movieCardComponent.setAddFavoriteClickListener(this._onFavoriteMovieControllerClick);

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

  _getMovieDetailsComponent(movie) {
    const movieDetailsComponent = new MovieDetailsComponent(movie);
    // TODO: нужно проверить правильность, не получилось сделать без передачи переменной,
    //  при повторном клике на карточку окно уже не закрывалось, + строки 26 и 27
    movieDetailsComponent.setCloseButtonClickListener(() => this._onCloseMovieDetailsButtonClick(movieDetailsComponent));

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

    // TODO: удаляется по два комментария
    movieDetailsComponent.setDeleteCommentButtonClickListener((evt) => {
      const modalElement = movieDetailsComponent.getElement();
      const modalElementScrollTop = modalElement.scrollTop;

      this._onDeleteCommentsButtonClick(evt, modalElementScrollTop);
    });

    movieDetailsComponent.setAddCommentListener((evt) => {
      const modalElement = movieDetailsComponent.getElement();
      const modalElementScrollTop = modalElement.scrollTop;

      this._onCreateNewCommentInputKeydown(evt, movieDetailsComponent, modalElementScrollTop);
    });

    document.addEventListener(`keydown`, (evt) => this._onCloseMovieDetailsKeydown(evt, movieDetailsComponent));

    return movieDetailsComponent;
  }

  _onCreateNewCommentInputKeydown(evt, movieDetailsComponent, modalElementScrollTop) {
    const isEnterAndCtrl = evt.key === `Enter` && evt.ctrlKey;

    if (isEnterAndCtrl) {
      const newComment = movieDetailsComponent.createNewComment();
      if (!newComment) {
        return;
      }

      newComment.movieID = this._movie.id;
      const newComments = this._movie.comments.concat(newComment);

      this._onDataChange(this, this._movie, Object.assign(this._movie, {comments: newComments}), modalElementScrollTop);
    }
  }

  _onDeleteCommentsButtonClick(evt, modalElementScrollTop) {
    evt.preventDefault();

    const commentElement = evt.target.closest(`.film-details__comment`);
    const commentId = commentElement.id;
    const comments = this._movie.comments.filter((comment) => {
      return comment.id !== Number(commentId);
    });

    this._onDataChange(this, this._movie, Object.assign(this._movie, {comments}), modalElementScrollTop);
  }

  _onCloseMovieDetailsKeydown(evt, movieDetailsComponent) {
    const isPressEscape = evt.keyCode === KeyCode.ESCAPE;

    if (isPressEscape) {
      movieDetailsComponent.resetAddComment();
      remove(movieDetailsComponent);
    }

    document.removeEventListener(`keydown`, this._onCloseMovieDetailsKeydown);
    this._modalMode = ModalMode.MODAL_HIDDEN;
  }

  _onCloseMovieDetailsButtonClick(movieDetailsComponent) {
    movieDetailsComponent.resetAddComment();
    remove(movieDetailsComponent);

    document.removeEventListener(`keydown`, this._onCloseMovieDetailsKeydown);
    this._modalMode = ModalMode.MODAL_HIDDEN;
  }

  _onWatchlistMovieControllerClick(elementScrollTop) {
    // TODO: смотреть данные, объект в объекте,
    //  по другому не получилось вернуть новый изменённый
    const newUserDetails = Object.assign({}, this._movie.userDetails,
        {isWatchlist: !this._movie.userDetails.isWatchlist});
    const newUserDetailsData = Object.assign({}, this._movie,
        {userDetails: newUserDetails});

    this._onDataChange(this, this._movie, newUserDetailsData, elementScrollTop);
  }

  _onWatchedMovieControllerClick(elementScrollTop) {
    // TODO: смотреть данные, объект в объекте,
    //  по другому не получилось вернуть новый изменённый
    const newUserDetails = Object.assign({}, this._movie.userDetails,
        {isWatched: !this._movie.userDetails.isWatched});
    const newUserDetailsData = Object.assign({}, this._movie,
        {userDetails: newUserDetails});

    this._onDataChange(this, this._movie, newUserDetailsData, elementScrollTop);
  }

  _onFavoriteMovieControllerClick(elementScrollTop) {
    // TODO: смотреть данные, объект в объекте,
    //  по другому не получилось вернуть новый изменённый
    const newUserDetails = Object.assign({}, this._movie.userDetails,
        {isFavorite: !this._movie.userDetails.isFavorite});
    const newUserDetailsData = Object.assign({}, this._movie,
        {userDetails: newUserDetails});

    this._onDataChange(this, this._movie, newUserDetailsData, elementScrollTop);
  }
}
