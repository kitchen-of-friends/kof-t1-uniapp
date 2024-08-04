<template>
  <view class="row-between" style="padding: 36rpx 64rpx">
    <view
      v-for="(item, index) in menuItems"
      :key="index"
      class="col-center"
      @click="item.method"
    >
      <image :src="item.icon" style="height: 64rpx; width: 64rpx" />
      <view style="font-size: 13px; margin-top: 8rpx">{{ item.title }}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: "mine-menu",
  props: {},
  data() {
    return {
      // 可在此自定义菜单
      menuItems: [
        {
          icon: "/static/mine-menu/appointment.png",
          title: "我的报名",
          method: this.toOrders,
        },

        {
          icon: "/static/mine-menu/about-us.png",
          title: "关于我们",
          method: this.showOurInfo,
        },
        {},
        {},
      ],
    };
  },
  computed: {},
  methods: {
    toOrders() {
      uni.navigateTo({
        url: "/modules/resource-pages/order-list-page",
      });
    },
    showOurInfo() {
      uni.showToast({
        title: "核桃 X 朋厨，牛逼！",
        icon: "none",
      });
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

<style></style>
