import {render, remove} from "../utils/render.js";
import {
  SHOWING_EXTRA_MOVIES_COUNT,
  SHOWING_MOVIES_COUNT_BY_BUTTON,
  SHOWING_MOVIES_COUNT_ON_START,
  ExtraListTitles,
} from "../utils/const.js";
import NormalListComponent from "../components/movies/normal-list/normal-list.js";
import NormalTitleComponent from "../components/movies/normal-list/normal-title.js";
import NormalCardContainerComponent from "../components/movies/normal-list/normal-container.js";
import ShowMoreButtonComponent from "../components/movies/show-more.js";
import NoDataComponent from "../components/movies/no-data.js";
import ExtraListComponent from "../components/movies/extra-list/extra-list.js";
import ExtraTitleComponent from "../components/movies/extra-list/extra-title.js";
import ExtraCardContainerComponent from "../components/movies/extra-list/extra-container.js";
import SortComponent, {SortType} from "../components/sort.js";
import MovieContainerComponent from "../components/movies/container.js";
import MovieController from "./movie-controller.js";


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

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this.onViewChange.bind(this);

    this._normalListElement = this._normalListComponent.getElement();
    this._normalCardContainerElement = this._normalCardContainerComponent.getElement();
    this._mainMovieListsElement = this._mainMovieListsComponent.getElement();

    this._showMoviesCount = null;
    this._newMovies = null;
    this._showedMovieControllers = [];
  }


  render(moviesData) {
    this._movies = moviesData;

    render(this._container, this._sortComponent);
    render(this._container, this._mainMovieListsComponent);
    this._sortComponent.setSortButtonClickListener((sortType) => this._onSortButtonClick(sortType, moviesData));

    this._renderNormalList(this._movies);
    this._renderExtraLists(this._movies);
  }

  _renderMovieCard(container, moviesData, onDataChange, onViewChange) {
    return moviesData.map((movie) => {
      const movieController = new MovieController(container, onDataChange, onViewChange);
      movieController.render(movie);

      return movieController;
    });
  }

  _getSortedMovies(sortType, movies, from, to) {
    let sortedMovies = [];
    const showingMovies = movies.slice();

    switch (sortType) {
      case SortType.SORT_DATE:
        sortedMovies = showingMovies.sort((a, b) => {
          // TODO: перепроверить после получения данных и переписать
          const yearReleaseA = new Date(a.movieInfo.release.date).getFullYear();
          const yearReleaseB = new Date(b.movieInfo.release.date).getFullYear();

          return yearReleaseB - yearReleaseA;
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
  }

  _onDataChange(movieController, oldMoviesData, newUserDetailsData, elementScrollTop) {
    const movieIndex = this._movies.findIndex((it) => it.userDetails === oldMoviesData.userDetails);

    const isOldDataNotMoviesData = movieIndex === -1;

    if (isOldDataNotMoviesData) {
      return;
    }

    this._movies[movieIndex].userDetails = newUserDetailsData;
    const newMoviesData = this._movies[movieIndex];

    this._movies = [].concat(this._movies.slice(0, movieIndex), newMoviesData, this._movies.slice(movieIndex + 1));

    movieController.render(this._movies[movieIndex]);
    movieController.movieDetailsComponent.getElement().scrollTo(0, elementScrollTop);
  }

  _onSortButtonClick(sortType, moviesData) {
    this._showMoviesCount = SHOWING_MOVIES_COUNT_ON_START;

    const sortedMovies = this._getSortedMovies(sortType, moviesData, 0, this._showMoviesCount);

    this._normalCardContainerElement.innerHTML = ``;
    remove(this._showMoreButtonComponent);

    this._newMovies = this._renderMovieCard(this._normalCardContainerElement,
        sortedMovies,
        this._onDataChange,
        this._onViewChange); // TODO: container, moviesData, onDataChange, onViewChange
    this._showedMovieControllers = this._showedMovieControllers.concat(this._newMovies);
    this._renderShowMoreButton(moviesData);
  }

  _onShowMoreButtonClick(moviesData) {
    const prevMovieShowCount = this._showMoviesCount;
    this._showMoviesCount = this._showMoviesCount + SHOWING_MOVIES_COUNT_BY_BUTTON;

    const sortedMovies = this._getSortedMovies(this._sortComponent.getSortType(), moviesData, prevMovieShowCount, this._showMoviesCount);

    this._newMovies = this._renderMovieCard(this._normalCardContainerElement,
        sortedMovies,
        this._onDataChange,
        this._onViewChange); // TODO: container, moviesData, onDataChange, onViewChange
    this._showedMovieControllers = this._showedMovieControllers.concat(this._newMovies);

    if (this._showMoviesCount >= moviesData.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton(moviesData) {
    render(this._normalListElement, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickListener(() => this._onShowMoreButtonClick(moviesData));
  }

  _renderNormalList(moviesData) {
    render(this._mainMovieListsElement, this._normalListComponent);

    if (!moviesData.length) {
      render(this._normalListElement, this._noDataComponent);

      return;
    }

    render(this._normalListElement, this._normalTitleComponent);
    render(this._normalListElement, this._normalCardContainerComponent);


    this._showMoviesCount = SHOWING_MOVIES_COUNT_ON_START;
    this._newMovies = this._renderMovieCard(this._normalCardContainerElement,
        moviesData.slice(0, this._showMoviesCount),
        this._onDataChange,
        this._onViewChange); // TODO: container, moviesData, onDataChange, onViewChange
    this._showedMovieControllers = this._showedMovieControllers.concat(this._newMovies);

    this._renderShowMoreButton(moviesData);
  }

  _renderExtraCard(title, movieSortData) {
    const extraList = new ExtraListComponent();
    const extraTitle = new ExtraTitleComponent(title);
    const extraContainer = new ExtraCardContainerComponent();

    render(this._mainMovieListsComponent.getElement(), extraList);
    render(extraList.getElement(), extraTitle);
    render(extraList.getElement(), extraContainer);

    for (let i = 0; i < SHOWING_EXTRA_MOVIES_COUNT; i++) {
      this._newMovies = this._renderMovieCard(extraContainer.getElement(),
          movieSortData.splice(0, i),
          this._onDataChange,
          this._onViewChange); // TODO: container, moviesData, onDataChange, onViewChange
      this._showedMovieControllers = this._showedMovieControllers.concat(this._newMovies);
    }
  }

  _renderExtraLists(moviesData) {
    if (moviesData.length) {
      const extraContainer = new ExtraCardContainerComponent();
      const sortMovieData = extraContainer.getExtraData(moviesData, SHOWING_EXTRA_MOVIES_COUNT);
      const maxRatingsInMovieData = sortMovieData.topRated;
      const maxCommentsInMovieData = sortMovieData.mostCommented;

      if (maxRatingsInMovieData[0].movieInfo.totalRating !== 0) {
        this._renderExtraCard(ExtraListTitles.TOP_RATED, maxRatingsInMovieData);
      }

      if (maxCommentsInMovieData[0].comments.length !== 0) {
        this._renderExtraCard(ExtraListTitles.MOST_COMMENTED, maxCommentsInMovieData);
      }
    }
  }

  onViewChange() {
    // TODO: колличество movie-controller.js
    this._showedMovieControllers.forEach((movie) => {
      return movie.setDefaultView();
    });
  }
}
