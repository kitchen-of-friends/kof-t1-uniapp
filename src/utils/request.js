import { SFL } from "../sdk/main";

let BASE_URL;

if (process.env.NODE_ENV === "development") {
  // LOCAL BACKEND
  BASE_URL = "https://shenchushe.com/stg/v1/rest";
} else {
  // TODO:替换prd环境源
  BASE_URL = "https://shenchushe.com/stg/v1/rest";
}

// 初始化SDK实例
const sdk = new SFL(BASE_URL);

export const request = async (code, data) => {
  try {
    const res = await sdk.call(code, data);
    return res;
  } catch (err) {
    uni.showToast({
      title: "请求失败",
      icon: "none",
      duration: 5000,
    });
    console.error(err);
  }
};
