import request from "../request";

export const M04_API_LIST = {
  // Get Memory Detail
  "0401": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/content/memory/detail", "GET", data);
  },

  // Get Memory List
  "0402": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/content/memory/list", "GET", data);
  },

  // Post or Update Memory
  "0403": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/content/memory", "POST", data);
  },

  // Delete Memory
  "0404": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/content/memory", "DELETE", data);
  },

  // Get Article Detail
  "0405": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/content/article/detail", "GET", data);
  },

  // Get Article List
  "0406": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/content/article/list", "GET", data);
  },

  // Upsert Article
  "0407": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/content/article", "POST", data);
  },

  // Delete Article
  "0408": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/content/article", "DELETE", data);
  },

  // Get Comment Detail
  "0409": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/content/comment/detail", "GET", data);
  },

  // Get Comment List
  "0410": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/content/comment/list", "GET", data);
  },

  // Upsert Comment
  "0411": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/content/comment", "POST", data);
  },

  // Delete Comment
  "0412": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/content/comment", "DELETE", data);
  },

  // Get Course Detail
  "0413": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/content/course/detail", "GET", data);
  },

  // Get Course List
  "0414": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/content/course/list", "GET", data);
  },

  // Upsert Course
  "0415": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/content/course", "POST", data);
  },

  // Delete Course
  "0416": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/content/course", "DELETE", data);
  },

  // Get Like List
  "0417": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/content/like/list", "GET", data);
  },

  // Upsert Like
  "0418": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/content/like", "POST", data);
  },

  // Delete Like
  "0419": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/content/like", "DELETE", data);
  },

  // Get Collect List
  "0420": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/content/collect/list", "GET", data);
  },

  // Upsert Collect
  "0421": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/content/collect", "POST", data);
  },

  // Delete Collect
  "0422": async (baseUrl, data = {}) => {
    return await request(baseUrl + "/content/collect", "DELETE", data);
  },
};
