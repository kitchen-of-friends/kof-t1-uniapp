<template>
  <view>
    <view class="container">
      <view
        class="row-center"
        style="
          justify-content: space-between;
          margin-left: 36rpx;
          margin-right: 36rpx;
        "
      >
        <!-- 分享 -->
        <view class="col-center" style="margin-right: 28rpx">
          <share-button :size="20" :color="'#111111'"></share-button>
          <view class="kof-subtext">分享</view>
        </view>

        <!-- 购买-->
        <button
          @click="purchaseItem"
          style="color: #fff"
          :style="{ background: ecoColor }"
        >
          ¥{{ (itemDetail.menu[current - 1].price / 100).toFixed(2) }}购买
        </button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "bottom-bar",
  props: {
    itemDetail: {
      type: Object,
    },
  },
  components: {},
  data() {
    return {
      popupOpend: false,
      current: 1,
      ecoColor: uni.getStorageSync("ecoColor"),
    };
  },
  computed: {},
  methods: {
    async purchaseItem() {
      // 活动付费
      const response = await this.$request("0307", this.purchaseInfo);
      if (this.itemDetail.menu[0].price > 0) {
        // 微信支付
        const that = this;
        wx.requestPayment({
          timeStamp: response.data.tx.wechat_pay_info.timestamp,
          nonceStr: response.data.tx.wechat_pay_info.nonce_str,
          package: response.data.tx.wechat_pay_info.package,
          signType: response.data.tx.wechat_pay_info.sign_type,
          paySign: response.data.tx.wechat_pay_info.sign,
          success(res) {
            // 进入我的活动页面
            uni.showToast({
              title: "支付成功",
              icon: "success",
              duration: 3000,
            });

            setTimeout(() => {
              this.paying = false;
              uni.navigateTo({
                url: `/modules/resource-pages/order-list-page`,
              });
            }, 2000);
          },
          fail(res) {
            // 支付取消或失败，弹窗告知请重试;
            console.log(res);
            uni.showToast({
              title: "支付取消或失败，请重试！",
              icon: "none",
              duration: 3000,
            });
            this.paying = false;
          },
        });
      }
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
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
  height: 130rpx;
  position: fixed;
  padding-bottom: env(safe-area-inset-bottom);
  bottom: 0;
  background: #fff;
  box-shadow: 0px -5px 25px 0px #cccccc45;
  z-index: 999;
}

button {
  margin: 20rpx 0rpx;
  width: 336rpx;
  height: 96rpx;
  padding: 13px 24px 13px 24px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-container {
  width: 750rpx;
  height: auto;
  border-radius: 24rpx 24rpx 0px 0px;
  padding: 40rpx 32rpx;
  box-sizing: border-box;
  background: #fff;
}
</style>
