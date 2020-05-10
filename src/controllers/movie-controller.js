// Констаты для параметров по умолчанию
import {generateMovieCards} from "../mock/film";
import {remove, render, RenderPosition} from "../utils/render";
import MoviePopupComponent from "../components/movie-popup";
import MovieCommentsComponents from "../components/movie-comments";
import MovieNormalListComponent from "../components/movie-normal-list";
import NoMovieTitleComponent from "../components/no-movie-title";
import MovieNormalListTitleComponent from "../components/movie-normal-list-title";
import MovieNormalListContainerComponent from "../components/movie-normal-list-container";
import MovieCardComponent from "../components/movie-card";
import MovieLoadMoreButtonComponent from "../components/movie-loadmore-button";
import MovieExtraListComponent from "../components/movie-extra-list";
import {getIndexRatingCards} from "../utils/common";

const FILMS_CARD_COUNT_MIN = 1;
const SHOWING_MOVIE_CARDS_COUNT_ON_START = 5;
const SHOWING_MOVIE_CARDS_COUNT_BY_BUTTON = 5;

const FilmsExtraList = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`,
};
// Констаты для параметров по умолчанию
const FILMS_CARD_COUNT = 20;
// Генерируем моки
const movieCards = generateMovieCards(FILMS_CARD_COUNT);

// Копируем массив основных кинокарточек для попапа
let popupMovieCards = movieCards.slice(0, SHOWING_MOVIE_CARDS_COUNT_ON_START);
// Массив для экстракарточек
const extraMovieCards = [];

// Функция отрисовки попапа
const renderPopup = () => {
  // Находим все отрисованные карточки фильмов
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
        remove(popup);
      };
      // Функция-слушатель для ESC
      const onPopupPressEsc = (evt) => {
        if (evt.keyCode === 27) {
          remove(popup);
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
          remove(moviePopups[1]);
          // document.removeEventListener(`click`, onMovieCardClick);
        }
      };

      document.addEventListener(`click`, onMovieCardClick);
    };

    const onMovieCardClick = (evt) => {
      // Если клик по посту или названию или комментарию - ренедрим попап текущей карточки
      const isMovieCardsElements = evt.target === moviePoster || evt.target === movieTitle || evt.target === movieComment;
      if (isMovieCardsElements) {
        // Объединяем откртые при клике на "показать еще" и полученные экстаракарточки
        const allMovieCards = popupMovieCards.concat(extraMovieCards);

        render(document.querySelector(`.footer`),
            new MoviePopupComponent(allMovieCards[index]), RenderPosition.AFTER_BEGIN);

        const moviePopup = document.querySelector(`.film-details`);
        const commentsContentPopup = moviePopup.querySelector(`.form-details__bottom-container`);
        const commentsList = commentsContentPopup.querySelector(`.film-details__comments-list`);

        allMovieCards[index].comments.forEach((it) => {
          render(commentsList, new MovieCommentsComponents(it), RenderPosition.BEFORE_END);
        });
        // Включаем функцию закрытия окна и передаём в неё попап
        initCloseButtonPopup(moviePopup);
      }
    };
    // Открываем попап
    card.addEventListener(`click`, onMovieCardClick);
  }
};
// Функция отрисовки кинокарточек
const renderMovieCards = (movieComponent, popup) => {
  const movieNormalListComponent = new MovieNormalListComponent();
  // Отрисовываем блок для обычных кинокарточек
  render(movieComponent.getElement(),
      movieNormalListComponent,
      RenderPosition.BEFORE_END);

  const filmsListElement = movieComponent.getElement().querySelector(`.films-list`);

  // Если кинокарточек нет, то выводим соответсвующее сообщение
  if (!movieCards.length) {
    render(filmsListElement,
        new NoMovieTitleComponent(),
        RenderPosition.BEFORE_END);

    return;
  }

  // Отрисовываем заголовок блока обычных кинокарточек
  render(filmsListElement,
      new MovieNormalListTitleComponent(),
      RenderPosition.BEFORE_END);
  // Отрисовываем основной контейнер для обычных кинокарточек
  render(filmsListElement,
      new MovieNormalListContainerComponent(),
      RenderPosition.BEFORE_END);

  const filmsContainerElement = filmsListElement.querySelector(`.films-list__container`);

  // Рендерим стартовую партию кинокарточек
  let showingMovieCardsCount = SHOWING_MOVIE_CARDS_COUNT_ON_START;
  movieCards.slice(0, showingMovieCardsCount)
    .forEach((movieCard) => render(filmsContainerElement,
        new MovieCardComponent(movieCard),
        RenderPosition.BEFORE_END));

  // Рендерим кнопку показать еще
  render(filmsListElement, new MovieLoadMoreButtonComponent(), RenderPosition.BEFORE_END);
  const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

  const onShowMoreButtonClick = () => {
    const prevMovieCardsCount = showingMovieCardsCount;
    showingMovieCardsCount = showingMovieCardsCount + SHOWING_MOVIE_CARDS_COUNT_BY_BUTTON;

    // Увеличиваем скопированный массив каждый раз при нажатии "показать еще"
    popupMovieCards = movieCards.slice(0, showingMovieCardsCount);

    movieCards.slice(prevMovieCardsCount, showingMovieCardsCount)
      .forEach((movieCard) => render(filmsContainerElement,
          new MovieCardComponent(movieCard),
          RenderPosition.BEFORE_END));

    if (showingMovieCardsCount >= movieCards.length) {
      remove(showMoreButton);
      showMoreButton.removeEventListener(`click`, onShowMoreButtonClick);
    }
    popup();

  };
  showMoreButton.addEventListener(`click`, onShowMoreButtonClick);
  renderExtraCards(popup, movieComponent);
};
// Функция отрисовки экстракарточек
const renderExtraCards = (popup, movieComponent) => {
  // Рендерим разделы для экстракарточек
  render(movieComponent.getElement(), new MovieExtraListComponent(FilmsExtraList.TOP_RATED), RenderPosition.BEFORE_END);
  render(movieComponent.getElement(), new MovieExtraListComponent(FilmsExtraList.MOST_COMMENTED), RenderPosition.BEFORE_END);
  // Получаем список экстразделов
  const filmsListExtraElement = movieComponent.getElement().querySelectorAll(`.films-list--extra`);

  // Если кинокарточки есть
  const isMovieCards = movieCards.length > FILMS_CARD_COUNT_MIN;
  // Если кинокарточка одна
  const isOneMovieCards = movieCards.length === FILMS_CARD_COUNT_MIN;

  if (isMovieCards) {
    // Самые популярные и комментируемые фильмы
    const popularsRatingsValue = getIndexRatingCards(movieCards, `rating`);
    const popularsCommentsValue = getIndexRatingCards(movieCards, `comments.length`);

    // Рендерим карточки в экстраразделе и добавляем их в общий массив карточек
    for (const [index, item] of filmsListExtraElement.entries()) {
      const filmsExtraContainerElement = item.querySelector(`.films-list__container`);
      // Если первый список (Top rated)
      if (!index) {
        render(filmsExtraContainerElement,
            new MovieCardComponent(movieCards[popularsRatingsValue.maxIndex]), RenderPosition.BEFORE_END);
        render(filmsExtraContainerElement,
            new MovieCardComponent(movieCards[popularsRatingsValue.nextIndex]), RenderPosition.BEFORE_END);

        extraMovieCards.push(movieCards[popularsRatingsValue.maxIndex]);
        extraMovieCards.push(movieCards[popularsRatingsValue.nextIndex]);
        // Если второй список (Most commented)
      } else {
        render(filmsExtraContainerElement,
            new MovieCardComponent(movieCards[popularsCommentsValue.maxIndex]), RenderPosition.BEFORE_END);
        render(filmsExtraContainerElement,
            new MovieCardComponent(movieCards[popularsCommentsValue.nextIndex]), RenderPosition.BEFORE_END);

        extraMovieCards.push(movieCards[popularsCommentsValue.maxIndex]);
        extraMovieCards.push(movieCards[popularsCommentsValue.nextIndex]);
      }
    }
    popup();
  } else if (isOneMovieCards) {
    // Рендерим карточки в экстраразделе и добавляем их в общий массив карточек
    for (const item of filmsListExtraElement) {
      const filmsExtraContainerElement = item.querySelector(`.films-list__container`);

      render(filmsExtraContainerElement,
          new MovieCardComponent(movieCards[0]), RenderPosition.BEFORE_END);
      extraMovieCards.push(movieCards[0]);
    }
    popup();
  }
};

class MovieController {
  constructor(container) {
    this._container = container;
  }

  render(cardsBlock) {
    renderMovieCards(cardsBlock, renderPopup);
  }
}


export {MovieController as default};