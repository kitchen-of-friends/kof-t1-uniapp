import request from "../request";

export const M02_API_LIST = {
  // 获取用户工作空间信息
  "0201": async (baseUrl, data = {}, opts = {}) => {
    return await request(baseUrl + "/org/user/workspace", "GET", data, opts);
  },
  // 获取管理员工作区
  "0202": async (baseUrl, data = {}, opts = {}) => {
    return await request(baseUrl + "/org/admin/workspace", "GET", data, opts);
  },
  // 删除组织
  "0203": async (baseUrl, data = {}, opts = {}) => {
    return await request(baseUrl + "/org/delete", "DELETE", data, opts);
  },
  // 获取组织详情
  "0204": async (baseUrl, data = {}, opts = {}) => {
    return await request(baseUrl + "/org/detail", "GET", data, opts);
  },
  // 获取组织列表
  "0205": async (baseUrl, data = {}, opts = {}) => {
    return await request(baseUrl + "/org/list", "GET", data, opts);
  },
  // 获取组织资源详情
  "0208": async (baseUrl, data = {}, opts = {}) => {
    return await request(baseUrl + "/org/resource/table", "GET", data, opts);
  },
  // 获取组织资源使用列表
  "0209": async (baseUrl, data = {}, opts = {}) => {
    return await request(baseUrl + "/org/resource/usage", "GET", data, opts);
  },
  // 添加资源使用
  "0210": async (baseUrl, data = {}, opts = {}) => {
    return await request(baseUrl + "/org/resource/use", "POST", data, opts);
  },
  // 更新或新增组织
  "0211": async (baseUrl, data = {}, opts = {}) => {
    return await request(baseUrl + "/org/upsert", "POST", data, opts);
  },
  // 添加用户角色
  "0212": async (baseUrl, data = {}, opts = {}) => {
    return await request(baseUrl + "/org/user_role/add", "POST", data, opts);
  },
  // 获取用户角色列表
  "0213": async (baseUrl, data = {}, opts = {}) => {
    return await request(baseUrl + "/org/user_role/list", "GET", data, opts);
  },
  // 撤销用户角色
  "0214": async (baseUrl, data = {}, opts = {}) => {
    return await request(baseUrl + "/org/user_role/revoke", "POST", data, opts);
  },
  // 获取所有生态
  "0215": async (baseUrl, data = {}, opts = {}) => {
    return await request(baseUrl + "/org/all/workspace", "GET", data, opts);
  },
};
