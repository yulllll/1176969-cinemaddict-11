import {getRandomItem} from "../utils/common.js";

const EMOTION_IMG = [
  `./images/emoji/angry.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/smile.png`,
];

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

const generateComment = (movieID) => {
  return {
    id: Math.ceil(Math.random() * 10),
    movieID,
    author: getRandomItem(authors),
    comment: getRandomItem(messages),
    date: +(new Date()) - Math.random() * 10 * 315360000,
    emotion: getRandomItem(EMOTION_IMG),
  };
};


export const generateComments = (count, movieID) => {
  const comments = [];

  for (let i = 0; i < count; i++) {
    comments.push(generateComment(movieID));
  }

  return comments;
};
