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
const SHOWING_MOVIE_CARDS_COUNT_ON_START = 5;
const SHOWING_MOVIE_CARDS_COUNT_BY_BUTTON = 5;

const movieCards = generateMovieCards(FILMS_CARD_COUNT);
const movieFilters = generateFilters(movieCards);

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

// Рендерим кнопку показать еще
render(filmsListElement, createShowMoreFilmsTemplate());
const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

const onShowMoreButtonClick = () => {
  const prevMovieCardsCount = showingMovieCardsCount;
  showingMovieCardsCount = showingMovieCardsCount + SHOWING_MOVIE_CARDS_COUNT_BY_BUTTON;

  movieCards.slice(prevMovieCardsCount, showingMovieCardsCount)
    .forEach((movieCard) => render(filmsContainerElement, createFilmCardTemplate(movieCard)));

  if (showingMovieCardsCount >= movieCards.length) {
    showMoreButton.remove();
    showMoreButton.removeEventListener(`click`, onShowMoreButtonClick);
  }
};
showMoreButton.addEventListener(`click`, onShowMoreButtonClick);

// Рендерим разделы для экстракарточек
render(filmsBlockElement, createFilmsListExtraTemplate(`Top rated`));
render(filmsBlockElement, createFilmsListExtraTemplate(`Most commented`));

// Копируем массив основных кинокарточек
const allMovieCards = movieCards.slice();

// Получаем список экстразделов
const filmsListExtraElement = filmsBlockElement.querySelectorAll(`.films-list--extra`);
// Создаём массивы рейтинга и комментариев для получения максимального значения
const movieRatings = movieCards.map((item) => item.rating);
const movieComments = movieCards.map((item) => item.comments);
// Получаем максимальное значение рейтинга и комментариев для экстракарточек
const getPopularValue = (value) => {
  const maxValue = value.reduce((acc, it, i) => {
    return value[acc] > it ? acc : i;
  }, 0);

  const nextValue = value.reduce((acc, it, i) => {
    if (maxValue !== i) {
      return value[acc] > it ? acc : i;
    } else {
      return i - 1;
    }
  }, 0);

  return {
    maxValue,
    nextValue,
  };
};
// Рендерим карточки в экстраразделе
for (const [index, item] of Array.from(filmsListExtraElement).entries()) {
  const filmsExtraContainerElement = item.querySelector(`.films-list__container`);

  if (!index) {
    render(filmsExtraContainerElement, createFilmCardTemplate(movieCards[getPopularValue(movieRatings).maxValue]));
    render(filmsExtraContainerElement, createFilmCardTemplate(movieCards[getPopularValue(movieRatings).nextValue]));
    // Добавляем в скопированный массив экстракарточки
    allMovieCards.push(movieCards[getPopularValue(movieRatings).maxValue]);
    allMovieCards.push(movieCards[getPopularValue(movieRatings).nextValue]);
  } else {
    render(filmsExtraContainerElement, createFilmCardTemplate(movieCards[getPopularValue(movieComments).maxValue]));
    render(filmsExtraContainerElement, createFilmCardTemplate(movieCards[getPopularValue(movieComments).nextValue]));
    // Добавляем в скопированный массив экстракарточки
    allMovieCards.push(movieCards[getPopularValue(movieComments).maxValue]);
    allMovieCards.push(movieCards[getPopularValue(movieComments).nextValue]);
  }
}

// Находим все отредеренные карточки фильмов
const moviesCards = document.querySelectorAll(`.film-card`);
// Цикл по всем карточкам с индексом итерации и элементом массива для открытия попапа
for (const [index, card] of Array.from(moviesCards).entries()) {
  const moviePoster = card.querySelector(`.film-card__poster`);
  const movieTitle = card.querySelector(`.film-card__title`);
  const movieComment = card.querySelector(`.film-card__comments`);

  const closePopup = (popup) => {
    // Ищем кнопку закрытия
    const closeButton = popup.querySelector(`.film-details__close-btn`);
    // Функция-слушатель для кнопки закрытия
    const onCloseButtonClick = () => {
      popup.remove();
      // card.removeEventListener(`click`, onMovieCardClick);
    };
    // Функция-слушатель для ESC
    const onPopupPressEsc = (evt) => {
      if (evt.keyCode === 27) {
        popup.remove();
        // card.removeEventListener(`click`, onMovieCardClick);
      }
      document.removeEventListener(`keydown`, onPopupPressEsc);
    };
    // Если попап открыт, то включаем ESC
    if (popup) {
      document.addEventListener(`keydown`, onPopupPressEsc);
    }
    // Событие клик для кнопки закрытия попапа
    closeButton.addEventListener(`click`, onCloseButtonClick);
  };

  const onMovieCardClick = (evt) => {
    // Если клик по посту или названию или комментарию - ренедрим попап текущей карточки
    if (evt.target === moviePoster || evt.target === movieTitle || evt.target === movieComment) {
      render(siteBodyElement.querySelector(`.footer`), createFilmDetailsPopupTemplate(allMovieCards[index]), FILMS_CARD_COUNT_DEFAULT, `afterend`);

      const moviePopup = document.querySelector(`.film-details`);
      const commentsContentPopup = moviePopup.querySelector(`.form-details__bottom-container`);
      const commentsList = commentsContentPopup.querySelector(`.film-details__comments-list`);

      allMovieCards[index].comments.forEach((it) => {
        render(commentsList, createMovieCommentsTemplate(it));
      });
      // Вызываем функцию закрытия окна и передаём в неё попап
      closePopup(moviePopup);
    }
  };
  // Открываем попап
  card.addEventListener(`click`, onMovieCardClick);
}
