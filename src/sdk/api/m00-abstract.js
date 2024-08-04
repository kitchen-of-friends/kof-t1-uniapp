import request from "../request";

export const M00_API_LIST = {
  // PING
  "0001": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/ping", "GET", data);
  },
};
