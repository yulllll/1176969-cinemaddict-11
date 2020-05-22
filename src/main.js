import {generateMovies} from "./mock/movie.js";
import {render} from "./utils/render.js";
import {MOVIE_CARD_COUNT} from "./const.js";
import UserProfileComponent from "./components/user-profile.js";
import FooterStatisticsComponent from "./components/footer";
import PageController from "./controllers/page-controller.js";
import FiltersController from "./controllers/filters-controller.js";
import MoviesModel from "./models/movies-model.js";

const moviesData = generateMovies(MOVIE_CARD_COUNT);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const userProfileComponent = new UserProfileComponent(moviesData);
const footerStatisticsComponent = new FooterStatisticsComponent(moviesData);

const moviesModel = new MoviesModel();

const pageController = new PageController(mainElement, moviesModel);
const filtersController = new FiltersController(mainElement, moviesModel);

render(headerElement, userProfileComponent);
render(footerElement.querySelector(`.footer__statistics`), footerStatisticsComponent);

moviesModel.setMovies(moviesData);
filtersController.render();
pageController.render();
