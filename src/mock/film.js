import {getRandomIndex, getRandomIntervalNumber} from "../utils.js";
import {generateComments} from "./comments.js";

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
const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`
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
    poster: getRandomIndex(posters),
    title: getRandomIndex(titles),
    rating: getRandomIntervalNumber(Ratings.MIN, Ratings.MAX).toFixed(1),
    year: Math.floor(getRandomIntervalNumber(Years.MIN, Years.MAX)),
    duration: getRandomIndex(durations),
    genre: getRandomIndex(genres),
    description: getRandomIndex(descriptions),
    // comments: movieComments.length,
    comments: generateComments(),
    director: getRandomIndex(directors),
    writers: getRandomIndex(writers),
    actors: getRandomIndex(actors),
    releaseDate: getRandomDay(),
    country: getRandomIndex(countries),
    age: getRandomIndex(ageRestrictions),
  };
};

// Генерируем карточки фильмов в массив
const generateMovieCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateMovieCard);
};
// Экспортируем полученный массив фильмов
export {generateMovieCards};
