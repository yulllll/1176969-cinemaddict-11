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

const dates = [
  `2019/12/31 23:59`,
  `2 days ago`,
  `Today`
];

const generateComment = () => {
  return {
    author: getRandomItem(authors),
    comment: getRandomItem(messages),
    date: getRandomItem(dates),
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
