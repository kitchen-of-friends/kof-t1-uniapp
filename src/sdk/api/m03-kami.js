import request from "../request";

export const M03_API_LIST = {
  // Delete Single Goods
  "0301": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/kami/goods/delete", "POST", data);
  },

  // Query Goods Detail **接口已废弃
  "0302": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/kami/goods/detail", "GET", data);
  },

  // Query Goods List
  "0303": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/kami/goods/list", "GET", data);
  },

  // Upsert Single Goods
  "0304": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/kami/goods/upsert", "POST", data);
  },

  // 取消互动
  "0305": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/kami/interact/delete", "POST", data);
  },

  // Query Interact List
  "0306": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/kami/interact/list", "GET", data);
  },

  // 购买goods
  "0307": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/kami/goods/purchase", "POST", data);
  },
  // 资源互动
  "0308": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/kami/interact/upsert", "POST", data);
  },
  // 获取goods拥有列表
  "0309": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/kami/goods/own/list", "GET", data);
  },
  // 查询orderDetail
  "0310": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/kami/order/detail", "GET", data);
  },
};
