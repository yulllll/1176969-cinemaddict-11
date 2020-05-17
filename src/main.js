import {generateMovies} from "./mock/movie.js";
import {render} from "./utils/render.js";
import UserProfileComponent from "./components/user-profile.js";
import FiltersComponent from "./components/filters";
import SortComponent from "./components/sort.js";
import FooterStatisticsComponent from "./components/footer";
import MovieContainerComponent from "./components/movies/movie-container.js";
import PageController from "./controllers/page-controller.js";

const MOVIE_CARD_COUNT = 50;
const movieData = generateMovies(MOVIE_CARD_COUNT);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const userProfile = new UserProfileComponent(movieData);
const filters = new FiltersComponent(movieData);
const sort = new SortComponent();
const movieContainer = new MovieContainerComponent();
const footerStatistics = new FooterStatisticsComponent(movieData);
const pageController = new PageController(movieData, movieContainer);

render(headerElement, userProfile);
render(mainElement, filters);
render(mainElement, sort);
render(mainElement, movieContainer);
render(footerElement.querySelector(`.footer__statistics`), footerStatistics);

pageController.renderNormalMovies();
pageController.renderExtraMovies();
