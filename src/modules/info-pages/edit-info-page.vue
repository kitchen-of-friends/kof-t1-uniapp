<template>
  <view>
    <navigate-bar :mid-text="'编辑资料'" :nav-mode="2"></navigate-bar>
    <!-- 头像 -->
    <view class="col-center" style="margin-top: 20rpx">
      <image :src="userInfo.avatar" mode="scaleToFill" class="avatar"></image>
      <button
        style="
          margin-top: -32rpx;
          width: 64rpx;
          height: 64rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          border-radius: 100rpx;
        "
        open-type="chooseAvatar"
        @chooseavatar="onChooseAvatar"
      >
        <uni-icons type="camera-filled" color="#1D2939" size="24" />
      </button>
    </view>
    <!-- 昵称及简介 -->
    <view style="margin: 48rpx 32rpx">
      <!-- 昵称 -->
      <view class="info-item-title">昵称</view>
      <view
        style="
          border: 1px solid #ebebeb;
          border-radius: 8rpx;
          width: full;
          padding: 16rpx 20rpx;
          font-size: 13px;
        "
      >
        <input
          v-model="userInfo.name"
          type="nickname"
          placeholder="可直接选择微信昵称哦"
        />
      </view>

      <view class="info-item-title"
        >个人简介<span class="kof-subtext" style="margin-left: 12rpx"
          >（{{ userInfo.content.length }}/200字）</span
        ></view
      >
      <view
        style="
          border: 1px solid #ebebeb;
          border-radius: 8rpx;
          padding: 16rpx 20rpx;
          font-size: 13px;
        "
      >
        <textarea
          v-model="userInfo.content"
          maxlength="200"
          placeholder="介绍一下自己吧，让大家更了解你：）"
        />
      </view>
    </view>
    <!-- 保存按钮 -->
    <view class="bottom-bar">
      <button
        style="
          height: 96rpx;
          width: 678rpx;
          background: #ff6333;
          color: #fff;
          font-size: 16px;
          font-weight: 500;
          margin-top: 17rpx;
          margin-left: 36rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 48rpx;
        "
        :style="{ background: ecoColor }"
        @click="submitInfo"
      >
        保存
      </button>
    </view>
  </view>
</template>

<script>
import { uploadImagesToCos } from "../../utils/cosUploder";
export default {
  components: {},
  data() {
    return {
      userInfo: {
        name: "",
        avatar: "",
        content: "",
      },
      ecoColor: uni.getStorageSync("ecoColor"),
    };
  },
  computed: {},
  methods: {
    // 点击修改头像,并上传COS
    async onChooseAvatar(e) {
      const avatarUrl = e.detail.avatarUrl;
      this.userInfo.avatar = avatarUrl; // 更新用户信息中的头像 URL
      // 修改为对应的文件夹名
      const imgList = [avatarUrl];
      const folderName = "co/eco/grav";

      try {
        // 上传图片到 COS
        const results = await uploadImagesToCos.call(this, imgList, folderName);
        const uploadedUrls = results.map(
          (result) => "https://" + result.Location
        );
        const avatarPath = uploadedUrls[0];

        const userInfo = uni.getStorageSync("userInfo");
        const userId = userInfo.id;
        const ecoId = uni.getStorageSync("eco_id");
        // 发送更新头像的请求
        await this.$request("0103", {
          avatar: avatarPath,
          id: userId,
          eco_id: ecoId,
        });

        console.log("头像更新成功");
      } catch (error) {
        console.error("上传头像或请求更新头像时出错:", error);
      }
    },
    // 保存资料
    async submitInfo() {
      const userInfo = uni.getStorageSync("userInfo");
      this.userInfo.id = userInfo.id;
      this.userInfo.eco_code = getApp().globalData.eco_code;
      this.userInfo.eco_id = getApp().globalData.eco_id;

      uni.showLoading({
        title: "正在提交",
      });
      const response = await this.$request("0103", this.userInfo);
      uni.hideLoading();
      uni.showToast({
        title: "提交成功",
        icon: "success",
        duration: 3000,
        complete: () => {
          uni.$emit("infoUpdate");
          uni.navigateBack();
        },
      });
    },
  },

  onLoad() {},
  async onShow() {
    this.userInfo.avatar = uni.getStorageSync("ecoInfo").avatar;
    // 获取用户最新资料
    const response = await this.$request("0104", {});
    this.userInfo = response.data;
  },

  beforeDestroy() {},
};
</script>

<style scoped>
.avatar {
  height: 168rpx;
  width: 168rpx;
  border-radius: 100rpx;
}

.info-item-title {
  font-size: 13px;
  margin: 40rpx 0rpx 16rpx 0rpx;
}

.bottom-bar {
  width: 750rpx;
  height: 130rpx;
  padding-bottom: env(safe-area-inset-bottom);
  background: #fff;
  position: fixed;
  bottom: 0;
}
</style>
