<template>
  <view>
    <view class="container">
      <view
        style="width: 500rpx; display: flex; flex-direction: column; gap: 12rpx"
      >
        <view style="font-size: 14px; font-weight: 500">
          {{ ecoInfo.name }}
        </view>
        <view style="font-size: 18px; font-weight: 500">
          {{ hasLogin ? userInfo.name : ecoInfo.default_username }}
        </view>
        <button
          :style="{
            border: '1px solid' + ecoColor,
            color: ecoColor,
            borderRadius: '48rpx',
            padding: '8rpx 24rpx',
            boxSizing: 'border-box',
            fontSize: '12px',
            width: '160rpx',
            height: '52rpx',
            margin: '0',
          }"
          @click="handleButtonClick"
        >
          {{ !hasLogin ? "立即登录" : "编辑资料" }}
        </button>
      </view>
      <!-- 头像 -->
      <image
        :src="hasLogin ? userInfo.avatar : ecoInfo.default_avatar"
        style="
          width: 108rpx;
          height: 108rpx;
          border-radius: 86rpx;
          border: 4rpx solid #fff;
        "
      ></image>
    </view>
    <view style="margin: 0rpx 44rpx; font-size: 13px; font-style: italic">{{
      userInfo.content
    }}</view>
  </view>
</template>

<script>
export default {
  name: "user-info-board",
  props: {},
  data() {
    return {
      hasLogin: false,
      userInfo: {},
      ecoInfo: {},
      ecoColor: uni.getStorageSync("ecoColor"),
    };
  },
  computed: {},
  methods: {
    // 获取用户信息
    async getUserInfo() {
      const res = uni.getStorageInfoSync();
      if (res.keys.includes("userInfo")) {
        this.hasLogin = true;
        const response = await this.$request("0104", {});
        this.userInfo = response.data;
      }
    },
    // 登录/修改资料
    handleButtonClick() {
      if (this.hasLogin) {
        uni.navigateTo({
          url: "/modules/info-pages/edit-info-page",
        });
      } else {
        uni.navigateTo({
          url: "/modules/setting-pages/login-page",
        });
      }
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    this.ecoInfo = uni.getStorageSync("ecoInfo");
  },
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
};
</script>

<style>
.container {
  width: 750rpx;
  height: auto;
  box-sizing: border-box;
  padding: 24rpx 44rpx 40rpx 44rpx;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
