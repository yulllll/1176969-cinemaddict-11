import {generateMovies} from "./mock/movie.js";
import {render} from "./utils/render.js";
import {MOVIE_CARD_COUNT} from "./const.js";
import UserProfileComponent from "./components/user-profile.js";
import FiltersComponent from "./components/filters";
import FooterStatisticsComponent from "./components/footer";
import PageController from "./controllers/page-controller.js";
import MoviesModel from "./models/movies.js";

const movieData = generateMovies(MOVIE_CARD_COUNT);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const userProfile = new UserProfileComponent(movieData);
const filters = new FiltersComponent(movieData);
const footerStatistics = new FooterStatisticsComponent(movieData);
const moviesModel = new MoviesModel();
const pageController = new PageController(mainElement, moviesModel);

render(headerElement, userProfile);
render(mainElement, filters);
render(footerElement.querySelector(`.footer__statistics`), footerStatistics);

moviesModel.setMovies(movieData);
pageController.render();
