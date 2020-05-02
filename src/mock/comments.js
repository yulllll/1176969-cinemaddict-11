import {getRandomItem, getRandomIntervalNumber} from "../utils";

// Данные для мокков
const emojis = [
  `smile`,
  `sleeping`,
  `puke`,
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
const сommentsLength = {
  MIN: 0,
  MAX: 5,
};

// Создаём комментарий
const generateComment = () => {
  return {
    emoji: getRandomItem(emojis),
    text: getRandomItem(texts),
    author: getRandomItem(autors),
    date: getRandomItem(dates),
  };
};

// Создаём массив комметариев
const generateComments = () => {
  const randomIndex = Math.floor(getRandomIntervalNumber(сommentsLength.MIN, сommentsLength.MAX));
  const comments = [];

  for (let i = 0; i < randomIndex; i++) {
    comments.push(generateComment());
  }
  return comments;
};

export {generateComments};
