// TODO: потом разобрать
// const moment = require(`moment`);
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
momentDurationFormatSetup(moment);

export const getRuntimeFormat = (minutes) => {
  return moment.duration(minutes, `minutes`).format(`h[h] m[m]`);
};

export const getReleaseYearFormat = (minutes) => {
  return moment(minutes).format(`YYYY`);
};

export const getReleaseDateFormat = (minutes) => {
  return moment(minutes).format(`D MMM YYYY`);
};

export const getCommentTime = (minutes) => {
  return moment(minutes).fromNow();
};
