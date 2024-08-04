<template>
  <view>
    <navigate-bar
      :is-needed="true"
      :bc-color="'#ffffff00'"
      :mid-text="'账号登录'"
      :nav-mode="2"
    >
    </navigate-bar>
    <view style="display: flex; flex-direction: column; align-items: center">
      <image
        :src="ecoLogo"
        style="
          margin-top: 212rpx;
          margin-bottom: 320rpx;
          height: 180rpx;
          width: 180rpx;
        "
      ></image>
      <view class="row-center">
        <button
          open-type="agreePrivacyAuthorization"
          @click="this.isChecked = !this.isChecked"
          class="check-box"
        >
          <checkbox
            style="transform: scale(0.6)"
            :value="isChecked"
            :checked="isChecked"
            :color="ecoColor"
          />
        </button>
        <view style="font-size: 11px; margin-left: 12rpx">
          我已阅读并同意<span
            style="color: #3399fe"
            @click="showPrivacyContract"
            >「隐私政策」</span
          ></view
        >
      </view>
      <!-- 登录按钮 -->
      <button
        style="margin: 40rpx 36rpx 0rpx 36rpx"
        :style="{
          opacity: isChecked && !isWaiting ? 1 : 0.6,
          background: ecoColor,
        }"
        open-type="getPhoneNumber"
        @getphonenumber="bindgetphonenumber"
      >
        {{ isWaiting ? "登录中……" : "手机号授权登录" }}
      </button>
      <!-- 暂不登录 -->
      <view
        style="
          font-size: 12px;
          color: #98a2b3;
          text-align: center;
          margin-top: 20rpx;
        "
        @click="handleBack"
        >暂不登录，返回上一页</view
      >
    </view>
    <!-- 伪元素 -->
    <view
      v-if="!isChecked"
      style="
        width: 678rpx;
        height: 160rpx;
        position: fixed;
        top: 940rpx;
        left: 36rpx;
      "
      @click="mentionAgree"
    ></view>
    <view
      style="
        width: 750rpx;
        height: 160rpx;
        background: #fff;
        position: fixed;
        bottom: 0;
      "
    ></view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      ecoLogo: "",
      ecoColor: uni.getStorageSync("ecoColor"),
      isWaiting: false, //是否登录中
      isChecked: false, //是否勾选用户协议
      // 用户登录数据
      loginInfo: {
        allow_register: true,
        eco_code: getApp().globalData.eco_code,
        method: 1,
        tel_code: "",
        wx_js_code: "",
      },
    };
  },
  computed: {},
  methods: {
    // 打开隐私协议
    showPrivacyContract() {
      wx.openPrivacyContract();
    }, // 请用户优先同意协议
    mentionAgree() {
      uni.showToast({
        title: "请先勾选同意隐私协议，谢谢！",
        icon: "none",
        duration: 3000,
      });
    },

    // 授权电话号码
    async bindgetphonenumber(e) {
      this.loginInfo.tel_code = e.detail.code;
      this.login();
    },

    // 用户登录
    async login() {
      this.isWaiting = true;
      try {
        // 进行用户wx登录
        const msg = await uni.login();
        this.loginInfo.wx_js_code = msg.code;
        console.log(msg.code);
        // 使用code获取用户open_id等信息
        const response = await this.$request("0101", this.loginInfo);
        // 本地保存用户登录信息及手机号
        await Promise.all([
          uni.setStorage({ key: "tel", data: response.data.user.tel }),
          uni.setStorage({ key: "codeT", data: response.data.user.tel_code }),
          uni.setStorage({ key: "jwt", data: response.data.jwt }),
          uni.setStorage({
            key: "userInfo",
            data: {
              name: response.data.user.name,
              avatar: response.data.user.avatar,
              id: response.data.user.id,
            },
          }),
        ]);
        this.isWaiting = false;
        // 更新全局登录状态
        getApp().globalData.isLogin = true;
        // 告知登录成功
        uni.showToast({
          title: "登录成功",
          icon: "success",
          duration: 2000,
          complete: () => {
            setTimeout(() => {
              uni.$emit("infoUpdate");
              uni.navigateBack();
            }, 2000);
          },
        });
      } catch (error) {
        console.error("登录失败！", error);
      }
    },
    // 用户不登录，返回上一页
    handleBack() {
      uni.navigateBack();
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    const ecoInfo = uni.getStorageSync("ecoInfo");
    this.ecoLogo = ecoInfo.avatar;
  },
};
</script>

<style scoped>
button {
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  border-radius: 48rpx;
  width: 678rpx;
  height: 96rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

button::after {
  border: none;
}

.check-box {
  margin-top: 0rpx;
  height: 44rpx;
  width: 44rpx;
  background-color: #ffffff;
  padding: 0 12rpx;
}
</style>
