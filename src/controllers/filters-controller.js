import FiltersComponent from "../components/filters.js";
import {render} from "../utils/render.js";
import {FilterTypes} from "../const.js";
import {replace} from "../utils/render.js";
import PageController from "./page-controller.js";

export default class FiltersController {
  constructor(container, moviesModel, commentsModel, api) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;

    this._api = api;
    this._movies = null;
    this._filterMovies = null;
    this._filtersComponent = null;
    this._filtersOldComponent = null;

    this._activeFilterType = FilterTypes.ALL;
    this._pageController = new PageController(this._container, this._moviesModel, this._commentsModel, this._api);

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._moviesModel.setFilterDataChangeListener(this._onDataChange);
  }

  render() {
    this._filterMovies = this._moviesModel.getMovies();

    this._filtersOldComponent = this._filtersComponent;
    this._filtersComponent = new FiltersComponent(this._filterMovies, this._activeFilterType);
    this._filtersComponent.setFilterChangeListener(this._onFilterChange);

    if (this._filtersOldComponent) {
      replace(this._filtersComponent, this._filtersOldComponent);
    } else {
      render(this._container, this._filtersComponent);
    }

    this._pageController.removeMovieContainer(this._filterMovies);
  }

  _onDataChange() {
    this.render();
  }

  _onFilterChange(filterType) {
    this._activeFilterType = filterType;
    this._moviesModel.setFilterType(filterType);
  }
}
