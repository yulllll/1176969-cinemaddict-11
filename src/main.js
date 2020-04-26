import {createUserProfileTemplate} from './components/user-profile.js';
import {createNavigationTemplate} from './components/navigation.js';
import {createSortTemplate} from './components/sort.js';
import {createFilmsBlockTemplate} from './components/films-block.js';
import {createFilmCardTemplate} from './components/film-card.js';
import {createShowMoreFilmsTemplate} from './components/load-more-films-button.js';
import {createFilmsListExtraTemplate} from './components/films-extra-list.js';
import {createFilmDetailsPopupTemplate} from './components/films-details-popup.js';
import {createMovieCommentsTemplate} from './components/movie-comments.js';
import {generateMovieCards} from './mock/film.js';
import {generateFilters} from "./mock/filters.js";

const FILMS_CARD_COUNT_DEFAULT = 1;
const FILMS_CARD_COUNT = 25;
const FILMS_CARD_COUNT_MIN = 1;
const SHOWING_MOVIE_CARDS_COUNT_ON_START = 5;
const SHOWING_MOVIE_CARDS_COUNT_BY_BUTTON = 5;

const movieCards = generateMovieCards(FILMS_CARD_COUNT);
const movieFilters = generateFilters(movieCards);
// --------------------------------------- В консоле -----------------------------
// console.log(movieCards);
// --------------------------------------- В консоле -----------------------------
const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);

const render = (container, template, count = FILMS_CARD_COUNT_DEFAULT, place = `beforeend`) => {
  for (let i = 0; i < count; i++) {
    container.insertAdjacentHTML(place, template);
  }
};

render(siteHeaderElement, createUserProfileTemplate());
render(siteMainElement, createNavigationTemplate(movieFilters));
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsBlockTemplate());

const filmsBlockElement = siteMainElement.querySelector(`.films`);
const filmsListElement = filmsBlockElement.querySelector(`.films-list`);
const filmsContainerElement = filmsListElement.querySelector(`.films-list__container`);

// Рендерим стартовую партию кинокарточек
let showingMovieCardsCount = SHOWING_MOVIE_CARDS_COUNT_ON_START;
movieCards.slice(0, showingMovieCardsCount)
  .forEach((movieCard) => render(filmsContainerElement, createFilmCardTemplate(movieCard)));

// Копируем массив основных кинокарточек для попапа
let popupMovieCards = movieCards.slice(0, showingMovieCardsCount);

// Рендерим кнопку показать еще
render(filmsListElement, createShowMoreFilmsTemplate());
const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

const onShowMoreButtonClick = () => {
  const prevMovieCardsCount = showingMovieCardsCount;
  showingMovieCardsCount = showingMovieCardsCount + SHOWING_MOVIE_CARDS_COUNT_BY_BUTTON;

  // Увеличиваем скопированный массив каждый раз при нажатии "показать больше"
  popupMovieCards = movieCards.slice(0, showingMovieCardsCount);

  movieCards.slice(prevMovieCardsCount, showingMovieCardsCount)
    .forEach((movieCard) => render(filmsContainerElement, createFilmCardTemplate(movieCard)));

  if (showingMovieCardsCount >= movieCards.length) {
    showMoreButton.remove();
    showMoreButton.removeEventListener(`click`, onShowMoreButtonClick);
  }
  initPopup();
};
showMoreButton.addEventListener(`click`, onShowMoreButtonClick);

// Функция работы попапа
const initPopup = () => {
  // Находим все отредеренные карточки фильмов
  const movieCardsElement = document.querySelectorAll(`.film-card`);

  // Цикл по всем карточкам с индексом итерации и элементом массива для открытия попапа
  for (const [index, card] of movieCardsElement.entries()) {
    const moviePoster = card.querySelector(`.film-card__poster`);
    const movieTitle = card.querySelector(`.film-card__title`);
    const movieComment = card.querySelector(`.film-card__comments`);

    const initCloseButtonPopup = (popup) => {
      // Ищем кнопку закрытия
      const closeButton = popup.querySelector(`.film-details__close-btn`);
      // Функция-слушатель для кнопки закрытия
      const onCloseButtonClick = () => {
        popup.remove();
      };
      // Функция-слушатель для ESC
      const onPopupPressEsc = (evt) => {
        if (evt.keyCode === 27) {
          popup.remove();
        }
        document.removeEventListener(`keydown`, onPopupPressEsc);
      };
      // Если попап открыт, то включаем ESC
      if (popup) {
        document.addEventListener(`keydown`, onPopupPressEsc);
      }
      // Событие клик для кнопки закрытия попапа
      closeButton.addEventListener(`click`, onCloseButtonClick);
      // Функция-слушатель для закрытия и открытия нового попапа, если попап открыт
      const onMovieCardClick = (evt) => {
        const moviePopups = document.querySelectorAll(`.film-details`);

        if (evt.target.closest(`.film-details`) !== popup && moviePopups.length > 1) {
          moviePopups[1].remove();
          // document.removeEventListener(`click`, onMovieCardClick);
        }
      };

      document.addEventListener(`click`, onMovieCardClick);
    };

    const onMovieCardClick = (evt) => {
      // Если клик по посту или названию или комментарию - ренедрим попап текущей карточки
      if (evt.target === moviePoster || evt.target === movieTitle || evt.target === movieComment) {
        // Объединяем откртые при клике на "показать еще" и полученные экстаракарточки
        const allMovieCards = popupMovieCards.concat(extraMovieCards);

        render(siteBodyElement.querySelector(`.footer`),
            createFilmDetailsPopupTemplate(allMovieCards[index]),
            FILMS_CARD_COUNT_DEFAULT, `afterend`);

        const moviePopup = document.querySelector(`.film-details`);
        const commentsContentPopup = moviePopup.querySelector(`.form-details__bottom-container`);
        const commentsList = commentsContentPopup.querySelector(`.film-details__comments-list`);

        allMovieCards[index].comments.forEach((it) => {
          render(commentsList, createMovieCommentsTemplate(it));
        });
        // Включаем функцию закрытия окна и передаём в неё попап
        initCloseButtonPopup(moviePopup);
      }
    };
    // Открываем попап
    card.addEventListener(`click`, onMovieCardClick);
  }
};

// Массив для экстракарточек
const extraMovieCards = [];
// Если кинокарточки есть
if (movieCards.length > FILMS_CARD_COUNT_MIN) {
  // Получаем максимальное значение рейтинга и комментариев для экстракарточек
  const getIndexRatingCards = (cards, propPath) => {
    const startValue = [0];
    const maxIndexes = [0];

    const propNames = propPath.split(`.`);

    for (const [index, card] of cards.entries()) {
      const prop = propNames.reduce((obj, name) => {
        return obj[name];
      }, card);

      if (prop > startValue[startValue.length - 1]) {
        startValue.push(prop);
        maxIndexes.push(index);

        continue;
      }
      if (prop > startValue[startValue.length - 2]) {
        startValue[startValue.length - 2] = prop;
        maxIndexes[maxIndexes.length - 2] = index;
      }
    }

    return {
      maxIndex: maxIndexes.pop(),
      nextIndex: maxIndexes.pop(),
    };
  };
  // Самые популярные фильмы
  const popularsRatingsValue = getIndexRatingCards(movieCards, `rating`); // topRated
  // Самые комментируемые фильмы
  const popularsCommentsValue = getIndexRatingCards(movieCards, `comments.length`); // mostComments

  // Рендерим разделы для экстракарточек
  render(filmsBlockElement, createFilmsListExtraTemplate(`Top rated`));
  render(filmsBlockElement, createFilmsListExtraTemplate(`Most commented`));

  // Получаем список экстразделов
  const filmsListExtraElement = filmsBlockElement.querySelectorAll(`.films-list--extra`);
  // Рендерим карточки в экстраразделе и добавляем их в общий массив карточек
  for (const [index, item] of filmsListExtraElement.entries()) {
    const filmsExtraContainerElement = item.querySelector(`.films-list__container`);
    // Если первый список (Top rated)
    if (!index) {
      render(filmsExtraContainerElement,
          createFilmCardTemplate(movieCards[popularsRatingsValue.maxIndex]));
      render(filmsExtraContainerElement,
          createFilmCardTemplate(movieCards[popularsRatingsValue.nextIndex]));

      extraMovieCards.push(movieCards[popularsRatingsValue.maxIndex]);
      extraMovieCards.push(movieCards[popularsRatingsValue.nextIndex]);
      // Если второй список (Most commented)
    } else {
      render(filmsExtraContainerElement,
          createFilmCardTemplate(movieCards[popularsCommentsValue.maxIndex]));
      render(filmsExtraContainerElement,
          createFilmCardTemplate(movieCards[popularsCommentsValue.nextIndex]));

      extraMovieCards.push(movieCards[popularsCommentsValue.maxIndex]);
      extraMovieCards.push(movieCards[popularsCommentsValue.nextIndex]);
    }
  }
  initPopup();
} else if (movieCards.length === FILMS_CARD_COUNT_MIN) {
  // Рендерим разделы для экстракарточек
  render(filmsBlockElement, createFilmsListExtraTemplate(`Top rated`));
  render(filmsBlockElement, createFilmsListExtraTemplate(`Most commented`));

  // Получаем список экстразделов
  const filmsListExtraElement = filmsBlockElement.querySelectorAll(`.films-list--extra`);

  // Рендерим карточки в экстраразделе и добавляем их в общий массив карточек
  for (const [index, item] of filmsListExtraElement.entries()) {
    const filmsExtraContainerElement = item.querySelector(`.films-list__container`);

    // Если первый список (Top rated)
    if (!index) {
      render(filmsExtraContainerElement,
          createFilmCardTemplate(movieCards[0]));
      extraMovieCards.push(movieCards[0]);

      // Если второй список (Most commented)
    } else {
      render(filmsExtraContainerElement,
          createFilmCardTemplate(movieCards[0]));
      extraMovieCards.push(movieCards[0]);
    }
  }
  initPopup();
}
