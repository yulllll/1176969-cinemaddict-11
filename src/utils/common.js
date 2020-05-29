// Длинна описания
export const getNewTrimmedString = (string, limit) => {
  let newString;
  if (string.length > limit) {
    newString = `${(string.substr(0, limit - 1)).trim()}...`;
  } else {
    newString = string;
  }

  return newString;
};
