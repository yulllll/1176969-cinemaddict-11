// // import {generateMovies} from "./mock/movie.js";
// import {render, remove} from "./utils/render.js";
// // import {MOVIE_CARD_COUNT} from "./const.js";
// import UserProfileComponent from "./components/user-profile.js";
// import FooterStatisticsComponent from "./components/footer";
// import PageController from "./controllers/page-controller.js";
// import FiltersController from "./controllers/filters-controller.js";
// import MoviesModel from "./models/movies-model.js";
// import SectionStatisticsComponent from "./components/statistics/section-statistics.js";
// import API from "./api/api.js";
//
// // const moviesData = generateMovies(MOVIE_CARD_COUNT);
//
// // GET /movies Authorization: Basic kTy9gIdsz2317rD
// // PUT /movies Authorization: Basic er883jdzbdw
// // Синхронизация с сервером /movies/sync Basic kTy9gIdsz2317rD
//
// // GET /comments/: film_id Authorization: Basic er883jdzbdw
// // POST /comments/: film_id Authorization: Basic er883jdzbdw
// // DELETE /comments/: comment_id Authorization: Basic er883jdzbdw
//
//
// const AUTHORIZATION = `Basic er883jdzbdw`;
// const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
// const api = new API(END_POINT, AUTHORIZATION);
//
// const headerElement = document.querySelector(`.header`);
// const mainElement = document.querySelector(`.main`);
// const footerElement = document.querySelector(`.footer`);
//
// // const userProfileComponent = new UserProfileComponent(moviesData);
// // const footerStatisticsComponent = new FooterStatisticsComponent(moviesData);
//
// const moviesModel = new MoviesModel();
//
// const pageController = new PageController(mainElement, moviesModel, api);
// const filtersController = new FiltersController(mainElement, moviesModel);
//
// // const statisticsComponent = new SectionStatisticsComponent(moviesData);
//
// // render(headerElement, userProfileComponent);
// // render(footerElement.querySelector(`.footer__statistics`), footerStatisticsComponent);
// // render(mainElement, statisticsComponent);
//
// // moviesModel.setMovies(moviesData);
// // filtersController.render();
// // pageController.render();
//
// let statisticsComponent = null;
// mainElement.addEventListener(`click`, (evt) => {
//   const statsButton = evt.target.closest(`.main-navigation__additional`);
//   const filterButton = evt.target.closest(`.main-navigation__item`);
//
//   if (!statsButton && !filterButton) {
//     return;
//   }
//
//   switch (evt.target) {
//     case statsButton:
//       pageController.hide();
//       if (statisticsComponent) {
//         remove(statisticsComponent);
//       }
//       statisticsComponent = new SectionStatisticsComponent(moviesModel);
//       render(mainElement, statisticsComponent);
//       break;
//     case filterButton:
//       if (statisticsComponent) {
//         remove(statisticsComponent);
//       }
//       pageController.show();
//       break;
//   }
// });
//
// api.getMovies()
//   .then((moviesData) => {
//     moviesData.map((movie) => {
//       return api.getComments(movie.id).then((comments) => {
//         movie.comments = comments;
//       });
//     });
//
//     // TODO: data
//     console.log(moviesData);
//
//     // const userProfileComponent = new UserProfileComponent().setMovies(moviesData);
//     const footerStatisticsComponent = new FooterStatisticsComponent(moviesData);
//     // userProfileComponent.setMovies(moviesData);
//
//     // render(headerElement, userProfileComponent);
//     render(footerElement.querySelector(`.footer__statistics`), footerStatisticsComponent);
//
//     moviesModel.setMovies(moviesData);
//     filtersController.render();
//     pageController.render();
//   });



// import {generateMovies} from "./mock/movie.js";
import {render, remove} from "./utils/render.js";
// import {MOVIE_CARD_COUNT} from "./const.js";
import UserProfileComponent from "./components/user-profile.js";
import FooterStatisticsComponent from "./components/footer";
import PageController from "./controllers/page-controller.js";
import FiltersController from "./controllers/filters-controller.js";
import MoviesModel from "./models/movies-model.js";
import SectionStatisticsComponent from "./components/statistics/section-statistics.js";
import API from "./api/api.js";
import LoadingComponent from "./components/loading";

// const moviesData = generateMovies(MOVIE_CARD_COUNT);

// GET /movies Authorization: Basic kTy9gIdsz2317rD
// PUT /movies Authorization: Basic er883jdzbdw
// Синхронизация с сервером /movies/sync Basic kTy9gIdsz2317rD

// GET /comments/: film_id Authorization: Basic er883jdzbdw
// POST /comments/: film_id Authorization: Basic er883jdzbdw
// DELETE /comments/: comment_id Authorization: Basic er883jdzbdw


const AUTHORIZATION = `Basic er883jdzbdw`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
const api = new API(END_POINT, AUTHORIZATION);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

// const userProfileComponent = new UserProfileComponent(moviesData);
// const footerStatisticsComponent = new FooterStatisticsComponent(moviesData);

const loadingComponent = new LoadingComponent();
const userProfileComponent = new UserProfileComponent();

const moviesModel = new MoviesModel();

const pageController = new PageController(mainElement, moviesModel, api);
const filtersController = new FiltersController(mainElement, moviesModel);


// const statisticsComponent = new SectionStatisticsComponent(moviesData);

// render(headerElement, userProfileComponent);
// render(footerElement.querySelector(`.footer__statistics`), footerStatisticsComponent);
// render(mainElement, statisticsComponent);

// moviesModel.setMovies(moviesData);
// filtersController.render();
// pageController.render();

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

render(headerElement, userProfileComponent);
render(mainElement, loadingComponent);

api.getMovies()
  .then((moviesData) => {
    moviesData.map((movie) => {
      return api.getComments(movie.id).then((comments) => {
        movie.comments = comments;
      });
    });

    // TODO: data
    console.log(moviesData);

    remove(userProfileComponent);
    remove(loadingComponent);

    userProfileComponent.setMovies(moviesData);
    const footerStatisticsComponent = new FooterStatisticsComponent(moviesData);

    render(headerElement, userProfileComponent);
    render(footerElement.querySelector(`.footer__statistics`), footerStatisticsComponent);

    moviesModel.setMovies(moviesData);
    filtersController.render();
    pageController.render();
  });
