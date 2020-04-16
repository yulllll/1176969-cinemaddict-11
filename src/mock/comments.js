import {getRandomIndex, getRandomIntervalNumber} from "../utils";

// Данные для мокков
const emojis = [
  `smile`,
  `sleeping`,
  `puke`, // пук)
  `angry`
];
const texts = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`
];
const autors = [
  `Tim Macoveev`,
  `John Doe`
];
const dates = [
  `2019/12/31 23:59`,
  `2 days ago`,
  `Today`
];
const CommentsLength = {
  MIN: 0,
  MAX: 5,
};

// Создаём комментарий
const generateComment = () => {
  return {
    emoji: getRandomIndex(emojis),
    text: getRandomIndex(texts),
    autor: getRandomIndex(autors),
    date: getRandomIndex(dates),
  };
};

// Создаём массив комметариев
const generateComments = () => {
  const randomIndex = Math.floor(getRandomIntervalNumber(CommentsLength.MIN, CommentsLength.MAX));

  return new Array(randomIndex)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
