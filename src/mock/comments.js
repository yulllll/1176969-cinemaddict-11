import {getRandomItem} from "../utils/common.js";
import {EMOTION_NAMES} from "../const.js";

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

const generateComment = () => {
  return {
    id: Math.ceil(Math.random() * 10),
    author: getRandomItem(authors),
    comment: getRandomItem(messages),
    date: +(new Date()) - Math.random() * 10 * 315360000,
    emotion: getRandomItem(EMOTION_NAMES),
  };
};


export const generateComments = (count) => {
  const comments = [];

  for (let i = 0; i < count; i++) {
    comments.push(generateComment());
  }

  return comments;
};
