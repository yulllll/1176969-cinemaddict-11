import API from "./api/api.js";
import LoadingComponent from "./components/loading";
import UserProfileComponent from "./components/user-profile.js";
import FooterComponent from "./components/footer-statistics";
import SectionStatisticsComponent from "./components/statistics/section-statistics.js";
import PageController from "./controllers/page-controller.js";
import FiltersController from "./controllers/filters-controller.js";
import MoviesModel from "./models/movies-model.js";
import CommentsModel from "./models/comments-model";
import {render, remove} from "./utils/render.js";

const AUTHORIZATION = `Basic er883jdzbdw`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
const api = new API(END_POINT, AUTHORIZATION);

const loadingComponent = new LoadingComponent();
const userProfileComponent = new UserProfileComponent();
const footerComponent = new FooterComponent();
let statisticsComponent = null;

const moviesModel = new MoviesModel();
const commentsModel = new CommentsModel();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

render(headerElement, userProfileComponent);
render(mainElement, loadingComponent);
render(footerElement.querySelector(`.footer__statistics`), footerComponent);

const pageController = new PageController(mainElement, moviesModel, commentsModel, api);
const filtersController = new FiltersController(mainElement, moviesModel, commentsModel, api);

// TODO: Подписываемся на кнопки фильтрации и статистики
const onMainElementFiltersButtonClick = (evt) => {
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
      mainElement.querySelector(`.main-navigation__additional`)
        .classList.add(`main-navigation__additional--active`);
      render(mainElement, statisticsComponent);
      break;
    case filterButton:
      if (statisticsComponent) {
        remove(statisticsComponent);
        mainElement.querySelector(`.main-navigation__additional`)
          .classList.remove(`main-navigation__additional--active`);
      }
      pageController.show();
      break;
  }
};

mainElement.addEventListener(`click`, onMainElementFiltersButtonClick);

// TODO: Запрос на сервер и отрисовываем основной контент
api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(movies);
    return Promise.all(movies.map((movie) => api.getComments(movie.id)));
  })
  .then((comments) => {
    const movies = moviesModel.getMovies();
    for (let i = 0; i < movies.length; i++) {
      commentsModel.setComments(movies[i].id, comments[i]);
    }
  })
  .catch(() => {
    moviesModel.setMovies([]);
  })
  .finally(() => {
    remove(userProfileComponent);
    remove(loadingComponent);
    remove(footerComponent);

    userProfileComponent.setMovies(moviesModel.getMovies());
    render(headerElement, userProfileComponent);

    filtersController.render();
    pageController.render();

    footerComponent.setMovies(moviesModel.getMovies());
    render(footerElement.querySelector(`.footer__statistics`), footerComponent);
  });
