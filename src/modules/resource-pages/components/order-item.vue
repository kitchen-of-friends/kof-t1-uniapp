<template>
  <view class="item-container" @click="queryDetail">
    <view class="row-between" style="padding-top: 24rpx; font-size: 12px">
      <view class="row-center">
        <uni-icons type="location" color="#98A2B3" size="12" />
        <view style="color: #98a2b3">{{ orderDetail.loc_info.name }}</view>
      </view>
      <view
        :style="{ color: orderDetail.state === 250 ? '#98A2B3' : ecoColor }"
        >{{
          orderDetail.state === 200
            ? "已报名"
            : orderDetail.state === 250
            ? "已结束"
            : ""
        }}</view
      >
    </view>
    <view class="row-center" style="margin: 24rpx 0rpx">
      <image
        :src="orderDetail.img_list[0]"
        style="height: 100rpx; width: 134rpx; border-radius: 8rpx"
      ></image>
      <view style="margin-left: 28rpx">
        <view style="font-size: 16px; font-weight: 500; margin-bottom: 6rpx">{{
          orderDetail.name
        }}</view>
        <view
          class="one-line-ellipsis"
          style="font-size: 14px; color: #475467"
          >{{ orderDetail.content }}</view
        >
      </view>
    </view>
    <view
      style="padding-bottom: 24rpx; font-size: 12px"
      :style="{ borderBottom: state === 90 ? '1px solid #F2F4F7' : '' }"
      >活动时间：
      {{ this.$formatDateTime(orderDetail.start_time, "formatB") }} ~
      {{ this.$formatDateTime(orderDetail.end_time, "formatC") }}</view
    >
  </view>
</template>

<script>
export default {
  name: "order-item",
  props: {
    orderDetail: {
      type: Object,
    },
  },
  data() {
    return {
      ecoColor: uni.getStorageSync("ecoColor"),
    };
  },
  computed: {},
  methods: {
    // 前往订单详情页
    queryDetail() {
      uni.navigateTo({
        url: `/modules/resource-pages/resource-detail-page?resourceId=${this.orderDetail.goods_id}`,
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.item-container {
  width: 694rpx;
  height: auto;
  border-radius: 16rpx;
  background: #fff;
  margin-top: 24rpx;
  margin-left: 28rpx;
  padding: 0rpx 32rpx;
  box-sizing: border-box;
}
</style>
