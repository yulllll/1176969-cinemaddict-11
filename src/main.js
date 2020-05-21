import {generateMovies} from "./mock/movie.js";
import {render} from "./utils/render.js";
import {MOVIE_CARD_COUNT} from "./const.js";
import UserProfileComponent from "./components/user-profile.js";
import FiltersComponent from "./components/filters";
import FooterStatisticsComponent from "./components/footer";
import PageController from "./controllers/page-controller.js";

const filmsData = generateMovies(MOVIE_CARD_COUNT);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const userProfile = new UserProfileComponent(filmsData);
const filters = new FiltersComponent(filmsData);
const footerStatistics = new FooterStatisticsComponent(filmsData);
const pageController = new PageController(mainElement);

render(headerElement, userProfile);
render(mainElement, filters);
render(footerElement.querySelector(`.footer__statistics`), footerStatistics);
pageController.render(filmsData);
