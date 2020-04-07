import {createUserProfileTemplate} from './components/user-profile.js';
import {createNavigationTemplate} from './components/navigation.js';
import {createSortTemplate} from './components/sort.js';
import {createFilmsBlockTemplate} from './components/films-block.js';
import {createFilmCardTemplate} from './components/film-card.js';
import {createShowMoreFilmsTemplate} from './components/load-more-films-button.js';
import {createFilmsListExtraTemplate} from './components/films-extra-list.js';
import {createFilmDetailsPopupTemplate} from './components/films-details-popup.js';

const FILMS_CARD_COUNT_DEFAULT = 1;
const FILMS_CARD_COUNT = 5;
const FILMS_LIST_EXTRA_COUNT = 2;
const FILMS_EXTRA_CARD_COUNT = 2;

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);

const render = (container, template, count = FILMS_CARD_COUNT_DEFAULT, place = `beforeend`) => {
  for (let i = 0; i < count; i++) {
    container.insertAdjacentHTML(place, template);
  }
};

render(siteHeaderElement, createUserProfileTemplate());
render(siteMainElement, createNavigationTemplate());
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsBlockTemplate());

const filmsBlockElement = siteMainElement.querySelector(`.films`);
const filmsListElement = filmsBlockElement.querySelector(`.films-list`);
const filmsContainerElement = filmsListElement.querySelector(`.films-list__container`);

render(filmsContainerElement, createFilmCardTemplate(), FILMS_CARD_COUNT);
render(filmsListElement, createShowMoreFilmsTemplate());
render(filmsBlockElement, createFilmsListExtraTemplate(), FILMS_LIST_EXTRA_COUNT);

const filmsListExtraElement = filmsBlockElement.querySelectorAll(`.films-list--extra`);

filmsListExtraElement.forEach((filmsList) => {
  const filmsExtraContainerElement = filmsList.querySelector(`.films-list__container`);
  render(filmsExtraContainerElement, createFilmCardTemplate(), FILMS_EXTRA_CARD_COUNT);
});

render(siteBodyElement, createFilmDetailsPopupTemplate());
