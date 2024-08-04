<script>
export default {
  onLaunch: function () {
    const systemInfo = uni.getSystemInfoSync();
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    this.globalData.navBarHeight =
      (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 +
      menuButtonInfo.height +
      systemInfo.statusBarHeight;
    this.globalData.navTopMargin = systemInfo.statusBarHeight;
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
  globalData: {
    navBarHeight: 0,
    navTopMargin: 0,
    // 请在此修改生态ID及code
    eco_id: "6698875d4982cfb56c3e0245",
    eco_code: 1,
  },
};
</script>

<style>
/*每个页面公共css */

/* 常用样式 */
.row-center {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.col-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.row-start {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.row-between {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.element-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

/* 按钮统一处理 */
button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0rpx;
}

button::after {
  border: none;
}

/* 字体样式 */
.one-line-ellipsis {
  word-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: pre-wrap;
}

.kof-header {
  font-size: 20px;
  font-weight: 500;
}
.kof-subheader {
  font-size: 16px;
  font-weight: 500;
}
.kof-text {
  font-size: 14px;
}
.kof-subtext {
  font-size: 12px;
  color: #98a2b3;
}
.load-more {
  margin-top: 44rpx;
  padding-bottom: 48rpx;
  text-align: center;
  font-size: 12px;
  color: #98a2b3;
}
</style>
