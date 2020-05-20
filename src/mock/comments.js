import {getRandomItem} from "../utils/common.js";

const authors = [
  `Tim Macoveev`,
  `John Doe`
];

const messages = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`
];

const emotions = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

const generateComment = () => {
  return {
    author: getRandomItem(authors),
    comment: getRandomItem(messages),
    date: +(new Date()) - Math.random() * 10 * 315360000,
    emotion: getRandomItem(emotions),
  };
};


export const generateComments = (count) => {
  const comments = [];

  for (let i = 0; i < count; i++) {
    comments.push(generateComment());
  }

  return comments;
};
