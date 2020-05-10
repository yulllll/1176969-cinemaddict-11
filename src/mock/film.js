import {getRandomItem, getRandomIndex, getRandomIntervalNumber} from "../utils/common.js";
import {generateComments} from "./comments.js";

// Количество сгенерированных участников группы
const MOVIE_CREW_GENRE_COUNT = 3;
// Данные для мокков
const Ratings = {
  MIN: 1,
  MAX: 10,
};
const Years = {
  MIN: 1935,
  MAX: 1970,
};
const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];
const titles = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
  `The Great Flamarion`
];
const durations = [
  `1h 55m`,
  `54m`,
  `1h 59m`,
  `1h 21m`,
  `16m`,
  `1h 18m`
];
const genres = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`
];
const directors = [
  `Anthony Mann`,
  `Steven Allan Spielberg`,
  `Sir Peter Robert Jackson`,
  `Martin Scorsese`,
  `Christopher Nolan`
];
const writers = [
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Billy Wilder`,
  `Charles Stuart Kaufman`,
  `David Keith Lynch`
];
const actors = [
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`,
  `Audie Leon Murphy`,
  `Stephen McNally`,
  `Joan Bennett`,
  `Jesse Hibbs`
];
const countries = [
  `USA`,
  `Japan`,
  `France`,
  `Italy`,
  `Russia`
];
const ageRestrictions = [
  `0+`,
  `6+`,
  `12+`,
  `16+`,
  `18+`
];

// Геенируем данные для сценаристов, актёров и жанра
const createMovieСrew = (names) => {
  const movieCrew = [];
  const initCloneNames = names.slice();
  for (let i = 0; i < MOVIE_CREW_GENRE_COUNT; i++) {
    const randomName = getRandomIndex(initCloneNames);
    movieCrew.push(initCloneNames[randomName]);
    initCloneNames.splice(randomName, 1);
  }
  return movieCrew;
};

// Получаем произвольную дату
const getRandomDay = () => {
  const date = new Date();
  const day = getRandomIntervalNumber(1, 31);
  const month = getRandomIntervalNumber(0, 11);
  const year = getRandomIntervalNumber(1935, 1970);

  date.setFullYear(year, month, day);
  const options = {day: `numeric`, month: `long`, year: `numeric`};
  return date.toLocaleDateString(`en-GB`, options);
};

// Генерируем карточку фильм
const generateMovieCard = () => {
  // const movieComments = generateComments();

  return {
    isWatchlist: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    poster: getRandomItem(posters),
    title: getRandomItem(titles),
    rating: getRandomIntervalNumber(Ratings.MIN, Ratings.MAX).toFixed(1),
    year: Math.floor(getRandomIntervalNumber(Years.MIN, Years.MAX)),
    duration: getRandomItem(durations),
    genres: createMovieСrew(genres),
    description: require(`getlorem`).words(getRandomIntervalNumber(10, 35)),
    comments: generateComments(),
    director: getRandomItem(directors),
    writers: createMovieСrew(writers),
    actors: createMovieСrew(actors),
    releaseDate: getRandomDay(),
    country: getRandomItem(countries),
    age: getRandomItem(ageRestrictions),
  };
};


// Генерируем карточки фильмов в массив
const generateMovieCards = (count) => {
  const cards = [];

  for (let i = 0; i < count; i++) {
    cards.push(generateMovieCard());
  }
  return cards;
};

// Экспортируем полученный массив фильмов
export {generateMovieCards};
