import {STATUS_CODE} from "../const.js";

export const checkResponseStatus = (response) => {
  if (response.status >= STATUS_CODE.OK && response.status < STATUS_CODE.MULTIPLE_CHOICES) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};
