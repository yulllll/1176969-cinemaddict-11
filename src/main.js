import {generateMovies} from "./mock/movie.js";
import {render, remove} from "./utils/render.js";
import {MOVIE_CARD_COUNT} from "./const.js";
import UserProfileComponent from "./components/user-profile.js";
import FooterStatisticsComponent from "./components/footer";
import PageController from "./controllers/page-controller.js";
import FiltersController from "./controllers/filters-controller.js";
import MoviesModel from "./models/movies-model.js";
import SectionStatisticsComponent from "./components/statistics/section-statistics.js";

const moviesData = generateMovies(MOVIE_CARD_COUNT);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const userProfileComponent = new UserProfileComponent(moviesData);
const footerStatisticsComponent = new FooterStatisticsComponent(moviesData);

const moviesModel = new MoviesModel();

const pageController = new PageController(mainElement, moviesModel);
const filtersController = new FiltersController(mainElement, moviesModel);

// const statisticsComponent = new SectionStatisticsComponent(moviesData);

render(headerElement, userProfileComponent);
render(footerElement.querySelector(`.footer__statistics`), footerStatisticsComponent);
// render(mainElement, statisticsComponent);

moviesModel.setMovies(moviesData);
filtersController.render();
pageController.render();

let statisticsComponent = null;
mainElement.addEventListener(`click`, (evt) => {
  const statsButton = evt.target.closest(`.main-navigation__additional`);
  const filterButton = evt.target.closest(`.main-navigation__item`);

  if (!statsButton && !filterButton) {
    return;
  }

  switch (evt.target) {
    case statsButton:
      pageController.hide();
      if (statisticsComponent) {
        remove(statisticsComponent);
      }
      statisticsComponent = new SectionStatisticsComponent(moviesModel);
      render(mainElement, statisticsComponent);
      break;
    case filterButton:
      if (statisticsComponent) {
        remove(statisticsComponent);
      }
      pageController.show();
      break;
  }
});
