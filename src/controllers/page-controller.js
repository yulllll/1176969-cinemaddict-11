import {render, remove} from "../utils/render.js";
import {KeyCode} from "../utils/common.js";
import {
  SHOWING_EXTRA_MOVIES_COUNT,
  SHOWING_MOVIES_COUNT_BY_BUTTON,
  SHOWING_MOVIES_COUNT_ON_START
} from "../utils/const.js";
import NormalListComponent from "../components/movies/normal-list/normal-list.js";
import NormalTitleComponent from "../components/movies/normal-list/normal-title.js";
import NormalCardContainerComponent from "../components/movies/normal-list/normal-container.js";
import ShowMoreButtonComponent from "../components/movies/show-more.js";
import NoDataComponent from "../components/movies/no-data.js";
import MovieCardComponent from "../components/movies/movie-card.js";
import ExtraListComponent from "../components/movies/extra-list/extra-list.js";
import ExtraTitleComponent from "../components/movies/extra-list/extra-title.js";
import ExtraCardContainerComponent from "../components/movies/extra-list/extra-container.js";
import MovieDetailsComponent from "../components/modal/movie-details.js";
import SortComponent, {SortType} from "../components/sort.js";
import MovieContainerComponent from "../components/movies/container.js";

const ExtraListTitles = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`,
};

const bodyElement = document.querySelector(`body`);

// Для отрисовки кинокарточек
const renderMovieCard = (container, filmsData) => {
  filmsData.forEach((movie) => {
    const movieCard = new MovieCardComponent(movie);
    movieCard.setCardClickListener(onMovieCardClick);

    return render(container, movieCard);
  });
};

// Слушатель клика по кинокарточке
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

// Для сортировки
const getSortedMovies = (sortType, movies, from, to) => {
  let sortedMovies = [];
  const showingMovies = movies.slice();

  switch (sortType) {
    case SortType.SORT_DATE:
      sortedMovies = showingMovies.sort((a, b) => {
        return b.movieInfo.release.date.substr(b.movieInfo.release.date.length - 4, 4) - a.movieInfo.release.date.substr(a.movieInfo.release.date.length - 4, 4);
      });
      break;
    case SortType.SORT_RATING:
      sortedMovies = showingMovies.sort((a, b) => {
        return b.movieInfo.totalRating - a.movieInfo.totalRating;
      });
      break;
    case SortType.DEFAULT:
      sortedMovies = showingMovies;
      break;
  }

  return sortedMovies.slice(from, to);
};


export default class PageController {
  constructor(container) {
    this._container = container;
    this._movies = null;

    this._sortComponent = new SortComponent();
    this._mainMovieListsComponent = new MovieContainerComponent();
    this._normalListComponent = new NormalListComponent();
    this._normalTitleComponent = new NormalTitleComponent();
    this._normalCardContainerComponent = new NormalCardContainerComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._noDataComponent = new NoDataComponent();
  }

  render(filmsData) {
    this._movies = filmsData;

    render(this._container, this._sortComponent);
    render(this._container, this._mainMovieListsComponent);

    this._renderNormalList(this._movies);
    this._renderExtraLists(this._movies);
  }

  _renderNormalList(filmsData) {

    const renderShowMoreButton = () => {
      render(normalListElement, this._showMoreButtonComponent);

      this._showMoreButtonComponent.setClickListener(() => {
        const prevMovieShowCount = showMoviesCount;
        showMoviesCount = showMoviesCount + SHOWING_MOVIES_COUNT_BY_BUTTON;

        const sortedMovies = getSortedMovies(this._sortComponent.getSortType(), filmsData, prevMovieShowCount, showMoviesCount);

        renderMovieCard(normalCardContainerElement, sortedMovies);

        if (showMoviesCount >= filmsData.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    const mainMovieListsElement = this._mainMovieListsComponent.getElement();
    render(mainMovieListsElement, this._normalListComponent);

    const normalListElement = this._normalListComponent.getElement();

    if (!filmsData.length) {
      render(normalListElement, this._noDataComponent);

      return;
    }

    let showMoviesCount = SHOWING_MOVIES_COUNT_ON_START;
    const normalCardContainerElement = this._normalCardContainerComponent.getElement();

    render(normalListElement, this._normalTitleComponent);
    render(normalListElement, this._normalCardContainerComponent);

    renderMovieCard(normalCardContainerElement, filmsData.slice(0, showMoviesCount));
    renderShowMoreButton();

    this._sortComponent.setSortButtonClickListener((sortType) => {
      showMoviesCount = SHOWING_MOVIES_COUNT_ON_START;

      const sortedMovies = getSortedMovies(sortType, filmsData, 0, showMoviesCount);

      normalCardContainerElement.innerHTML = ``;
      remove(this._showMoreButtonComponent);

      renderMovieCard(normalCardContainerElement, sortedMovies);
      renderShowMoreButton();
    });
  }

  _renderExtraList(title, moviesSortData) {
    const extraList = new ExtraListComponent();
    const extraTitle = new ExtraTitleComponent(title);
    const extraContainer = new ExtraCardContainerComponent();

    render(this._mainMovieListsComponent.getElement(), extraList);
    render(extraList.getElement(), extraTitle);
    render(extraList.getElement(), extraContainer);

    for (let i = 0; i < SHOWING_EXTRA_MOVIES_COUNT; i++) {
      renderMovieCard(extraContainer.getElement(), moviesSortData.splice(0, i));
    }
  }

  _renderExtraLists(filmsData) {
    if (filmsData.length) {
      const extraContainer = new ExtraCardContainerComponent();
      const sortMovieData = extraContainer.getExtraData(filmsData, SHOWING_EXTRA_MOVIES_COUNT);
      const maxMovieRatingsData = sortMovieData.topRated;
      const maxMovieCommentsData = sortMovieData.mostCommented;

      this._renderExtraList(ExtraListTitles.TOP_RATED, maxMovieRatingsData);
      this._renderExtraList(ExtraListTitles.MOST_COMMENTED, maxMovieCommentsData);
    }
  }
}
