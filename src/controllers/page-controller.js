import {render, remove} from "../utils/render.js";
import {KeyCode} from "../utils/common.js";
import NormalListComponent from "../components/movies/normal-list/normal-list.js";
import NormalTitleComponent from "../components/movies/normal-list/normal-title.js";
import NormalContainerComponent from "../components/movies/normal-list/normal-container.js";
import ShowMoreButtonComponent from "../components/movies/show-more.js";
import NoDataComponent from "../components/movies/no-data.js";
import MovieCardComponent from "../components/movies/movie-card.js";
import ExtraListComponent from "../components/movies/extra-list/extra-list.js";
import ExtraTitleComponent from "../components/movies/extra-list/extra-title.js";
import ExtraContainerComponent from "../components/movies/extra-list/extra-container.js";
import MovieDetailsComponent from "../components/modal/movie-details.js";

const SHOWING_EXTRA_MOVIES_COUNT = 2;
const SHOWING_MOVIES_COUNT_ON_START = 5;
const SHOWING_MOVIES_COUNT_BY_BUTTON = 5;

const MovieExtraTitles = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`,
};

const bodyElement = document.querySelector(`body`);

const renderMovieCard = (container, movie) => {
  const movieCard = new MovieCardComponent(movie);

  movieCard.setCardClickListener(onMovieCardClick);
  render(container, movieCard);
};

const onMovieCardClick = (click, movie, cardComponent) => {
  const modalMovieDetailsComponent = new MovieDetailsComponent(movie);

  const movieCardElement = cardComponent.getElement();
  const cardPosterElement = movieCardElement.querySelector(`.film-card__poster`);
  const cardTitleElement = movieCardElement.querySelector(`.film-card__title`);
  const cardCommentElement = movieCardElement.querySelector(`.film-card__comments`);
  const movieDetailsElements = bodyElement.querySelectorAll(`.film-details`);

  const isMovieCardElementsClick = click.target === cardPosterElement || click.target === cardTitleElement || click.target === cardCommentElement;
  const isModalOpen = isMovieCardElementsClick && movieDetailsElements.length >= 1;
  const isModalHidden = isMovieCardElementsClick && movieDetailsElements.length === 0;

  if (isModalOpen) {
    movieDetailsElements[0].remove();
    render(bodyElement, modalMovieDetailsComponent);
  } else if (isModalHidden) {
    render(bodyElement, modalMovieDetailsComponent);
  }

  modalMovieDetailsComponent.setCloseButtonClickListener(() => {
    remove(modalMovieDetailsComponent);

    document.removeEventListener(`keydown`, onModalPressEsc);
  });


  const onModalPressEsc = (evt) => {
    const isPressEscape = evt.keyCode === KeyCode.ESCAPE;

    if (isPressEscape) {
      remove(modalMovieDetailsComponent);
    }

    document.removeEventListener(`keydown`, onModalPressEsc);
  };

  document.addEventListener(`keydown`, onModalPressEsc);
};

export default class PageController {
  constructor(movies, container) {
    this._movies = movies;
    this._container = container.getElement();

    this._normalList = new NormalListComponent();
    this._normalTitle = new NormalTitleComponent();
    this._normalContainer = new NormalContainerComponent();
    this._noData = new NoDataComponent();
    this._showMoreButton = new ShowMoreButtonComponent();

    this._extraShowingCount = SHOWING_EXTRA_MOVIES_COUNT;
    this._startShowingCount = SHOWING_MOVIES_COUNT_ON_START;
    this._stepShowingCount = SHOWING_MOVIES_COUNT_BY_BUTTON;
    this._movieExtraTitles = MovieExtraTitles;
  }

  renderNormalMovies() {
    render(this._container, this._normalList);

    if (!this._movies.length) {
      render(this._normalList.getElement(), this._noData);

      return;
    }

    render(this._normalList.getElement(), this._normalTitle);
    render(this._normalList.getElement(), this._normalContainer);

    let showingMoviesCount = this._startShowingCount;

    this._movies.slice(0, showingMoviesCount)
      .forEach((movie) => renderMovieCard(this._normalContainer.getElement(), movie));

    render(this._normalList.getElement(), this._showMoreButton);

    this._showMoreButton.setClickListener(() => {
      const prevMoviesCount = showingMoviesCount;
      showingMoviesCount = showingMoviesCount + this._stepShowingCount;

      this._movies.slice(prevMoviesCount, showingMoviesCount)
        .forEach((movie) => renderMovieCard(this._normalContainer.getElement(), movie));

      if (showingMoviesCount >= this._movies.length) {
        remove(this._showMoreButton);
      }
    });
  }

  _getExtraList(title, movies) {
    const extraList = new ExtraListComponent();
    const extraContainer = new ExtraContainerComponent();
    const extraTitle = new ExtraTitleComponent(title);

    render(this._container, extraList);
    render(extraList.getElement(), extraTitle);
    render(extraList.getElement(), extraContainer);

    for (let i = 0; i < this._extraShowingCount; i++) {
      renderMovieCard(extraContainer.getElement(), movies[i]);
    }
  }

  renderExtraMovies() {
    if (this._movies.length) {
      const extraListContainer = new ExtraContainerComponent();
      const sortMovieData = extraListContainer.getExtraData(this._movies, this._extraShowingCount);
      const ratingsData = sortMovieData.topRated;
      const commentsData = sortMovieData.mostCommented;

      this._getExtraList(this._movieExtraTitles.TOP_RATED, ratingsData);
      this._getExtraList(this._movieExtraTitles.MOST_COMMENTED, commentsData);
    }
  }
}
