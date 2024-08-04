const request = (url, method, data = {}, options = {}) => {
  // 默认的 headers
  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: uni.getStorageSync("jwt"),
  };

  // 合并传入的 headers 和默认的 headers
  const headers = {
    ...defaultHeaders,
    ...options.headers, // options.headers 允许覆盖默认 headers
  };

  return new Promise((resolve, reject) => {
    uni.request({
      url,
      method,
      data,
      header: headers,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else if (res.statusCode === 401) {
          // 登录错误提示码，跳转到登录页面
          if (res.data.code === "401001") {
            uni.showToast({
              title: res.data.message,
              icon: "none",
              duration: 2000,
              complete: () => {
                setTimeout(() => {
                  uni.navigateTo({
                    url: "/modules/setting-pages/login-page",
                  });
                }, 1000);
              },
            });
          }
        } else {
          // 其余错误类型弹窗错误信息即可
          uni.showToast({
            title: res.data.message,
            icon: "none",
            duration: 2000,
          });
        }
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

export default request;
