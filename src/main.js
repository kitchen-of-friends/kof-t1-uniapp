import { createSSRApp } from "vue";
import App from "./App.vue";

import { request } from "./utils/request.js";
import { formatDateTime } from "./utils/dateFormater.js";

import navigateBar from "./components/navigate-bar.vue";
import resourceList from "./components/resource-list.vue";
import bannerSwiper from "./components/banner-swiper.vue";
import zeroMarkdownView from "./components/zero-markdown-view/components/zero-markdown-view/zero-markdown-view.vue";
import shareButton from "./components/share-button.vue";

export function createApp() {
  const app = createSSRApp(App);
  // 全局注册组件
  app.component("navigate-bar", navigateBar);
  app.component("resource-list", resourceList);
  app.component("banner-swiper", bannerSwiper);
  app.component("zero-markdown-view", zeroMarkdownView);
  app.component("share-button", shareButton);

  // 全局定义方法
  app.config.globalProperties.$request = request;
  app.config.globalProperties.$formatDateTime = formatDateTime;
  return {
    app,
  };
}
