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

export const getRuntimeSeparated = (minutes) => {
  const time = moment.duration(minutes, `minutes`).format(`h m`);
  const separateTime = time.split(` `);

  return {
    hours: separateTime[0],
    minutes: separateTime[1],
  };
};
