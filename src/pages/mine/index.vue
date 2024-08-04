<template>
  <view>
    <navigate-bar
      :is-needed="true"
      :bc-color="'#ffffff00'"
      :mid-text="'个人中心'"
    >
      <template #left></template>
    </navigate-bar>
    <!-- 用户信息 -->
    <user-info-board ref="userInfo"></user-info-board>
    <!-- 菜单栏 -->
    <mine-menu></mine-menu>
  </view>
</template>

<script>
import userInfoBoard from "./components/user-info-board.vue";
import mineMenu from "./components/mine-menu.vue";
export default {
  components: {
    userInfoBoard,
    mineMenu,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    updateInfo() {
      this.$refs.userInfo.getUserInfo();
    },
  },
  watch: {},
  onLoad() {
    // 监听用户资料变化，刷新组件信息
    uni.$on("infoUpdate", () => {
      this.updateInfo();
    });
  },
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
};
</script>

<style scoped></style>
