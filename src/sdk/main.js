// src/sdk/main.js
import { M00_API_LIST } from "./api/m00-abstract";
import { M01_API_LIST } from "./api/m01-idc";
import { M02_API_LIST } from "./api/m02-org";
import { M03_API_LIST } from "./api/m03-kami";
import { M04_API_LIST } from "./api/m04-ebm";

export class SFL {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
    this.API_MAP = {};
    this.injectApi(M00_API_LIST);
    this.injectApi(M01_API_LIST);
    this.injectApi(M02_API_LIST);
    this.injectApi(M03_API_LIST);
    this.injectApi(M04_API_LIST);
  }

  injectApi(apiList) {
    for (const [key, value] of Object.entries(apiList)) {
      this.API_MAP[key] = value;
    }
  }

  async call(code, data) {
    if (!this.API_MAP[code]) {
      throw new Error("API 不存在");
    }

    return await this.API_MAP[code](this.BASE_URL, data);
  }
}
