// Импорт моков
import {generateMovieCards} from './mock/film.js';
import {generateFilters} from "./mock/filters.js";
// Импорт компонентов
import MovieMainBlockComponent from "./components/movie-main-block.js";
import MovieFiltersComponent from "./components/movie-filters.js";
import MovieSortComponent from "./components/movie-sort.js";
import UserProfileComponent from "./components/user-profile.js";
// Импорт утилит
import {RenderPosition, render} from "./utils/render.js";
// Импорт контроллера
import PageController from "./controllers/movie-controller";

// Констаты для параметров по умолчанию
const FILMS_CARD_COUNT = 20;

// Генерируем моки
const movieCards = generateMovieCards(FILMS_CARD_COUNT);
const movieFilters = generateFilters(movieCards);

const siteBodyElement = document.querySelector(`body`);

const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);

render(siteHeaderElement, new UserProfileComponent(), RenderPosition.BEFORE_END);
render(siteMainElement, new MovieFiltersComponent(movieFilters), RenderPosition.BEFORE_END);
render(siteMainElement, new MovieSortComponent(), RenderPosition.BEFORE_END);

const movieMainBlockComponent = new MovieMainBlockComponent();
render(siteMainElement, movieMainBlockComponent, RenderPosition.BEFORE_END);

new PageController().render(movieMainBlockComponent);
