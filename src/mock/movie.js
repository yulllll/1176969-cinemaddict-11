import {getRandomItem, getRandomIndex, getRandomIntervalNumber} from "../utils/common.js";
import {generateComments} from "./comments.js";

const titles = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
  `The Great Flamarion`
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

const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const Ratings = {
  MIN: 1,
  MAX: 10,
};

const Durations = {
  MAX: 120,
  MIN: 30,
};

const genres = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`
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

const collectMovieTeam = (members) => {
  const movieTeam = [];
  const movieTeamCount = 3;
  const membersCopy = members.slice();

  for (let i = 0; i < movieTeamCount; i++) {
    const randomName = getRandomIndex(membersCopy);
    movieTeam.push(membersCopy[randomName]);
    membersCopy.splice(randomName, 1);
  }

  return movieTeam;
};

const generateMovie = (movieID) => {
  const COMMENT_COUNT = Math.round(Math.random() * 10);

  return {
    id: movieID,
    comments: generateComments(COMMENT_COUNT),
    movieInfo: {
      title: getRandomItem(titles),
      altTitle: getRandomItem(titles),
      totalRating: getRandomIntervalNumber(Ratings.MIN, Ratings.MAX).toFixed(1),
      poster: getRandomItem(posters),
      ageRating: getRandomItem(ageRestrictions),
      director: getRandomItem(directors),
      writers: collectMovieTeam(writers),
      actors: collectMovieTeam(actors),
      release: {
        date: +(new Date()) - Math.random() * 10 * 31536000000,
        country: getRandomItem(countries),
      },
      runtime: getRandomIntervalNumber(Durations.MIN, Durations.MAX),
      genres: collectMovieTeam(genres),
      description: require(`getlorem`).words(Math.round(getRandomIntervalNumber(10, 35))),
    },
    userDetails: {
      isWatchlist: Math.random() > 0.5,
      isWatched: Math.random() > 0.5,
      watchingDate: +(new Date()) - Math.random() * 10 * 31536000000,
      isFavorite: Math.random() > 0.5,
    },
  };
};

export const generateMovies = (count) => {
  const movies = [];

  for (let i = 0; i < count; i++) {
    movies.push(generateMovie(i));
  }

  return movies;
};
