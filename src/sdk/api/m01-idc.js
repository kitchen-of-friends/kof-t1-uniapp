import request from "../request";

export const M01_API_LIST = {
  // Login
  "0101": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/idc/user/login", "POST", data);
  },
  //  获取COS临时密钥
  "0102": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/idc/user/cos/sts", "GET", data);
  },
  //  修改用户信息
  "0103": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/idc/user/update", "POST", data);
  },
  //  获取当前用户信息（自己）
  "0104": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/idc/user/info/self", "GET", data);
  },
  // 获取其他用户信息
  "0105": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/idc/user/info/any", "GET", data);
  },
  // 获取生态内所有用户列表
  "0106": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/idc/user/list", "GET", data);
  },
};
