<template>
  <view>
    <view
      style="
        margin-top: 44rpx;
        font-size: 13px;
        font-weight: 500;
        margin-bottom: 20rpx;
      "
      >最近参与</view
    >
    <view
      class="row-center"
      style="width: 686rpx; gap: 28rpx; margin-top: 24rpx"
    >
      <view
        v-for="(user, index) in entrantInfo.slice(0, 6)"
        :key="index"
        class="col-center"
        style="width: 80rpx"
      >
        <image
          :src="user.avatar"
          style="height: 80rpx; width: 80rpx; border-radius: 100%"
        ></image>
        <view
          style="
            font-size: 11px;
            margin-top: 6rpx;
            text-align: center;
            color: #98a2b3;
          "
          >{{
            user.name.length > 4 ? user.name.slice(0, 3) + ".." : user.name
          }}</view
        >
      </view>
      <view
        v-if="entrantInfo.length === 0"
        style="width: 100%; font-size: 12px; color: #98a2b3; text-align: center"
        >快呼朋引伴一起来玩吧～</view
      >
    </view>
  </view>
</template>

<script>
export default {
  props: {
    gid: {
      type: String,
    },
  },
  data() {
    return {
      entrantInfo: [],
    };
  },
  components: {},
  computed: {},
  methods: {
    // 获取购买者列表
    async getPurchaseList() {
      const response = await this.$request("0309", {
        gid: this.gid,
        pageSize: 6,
      });

      const tempList = response.data.data;

      // 获取购买者信息
      const details = await Promise.all(
        tempList.map(async (item) => {
          const res = await this.$request("0105", {
            user_id: item.owner_addr,
          });
          return {
            ...res.data,
          };
        })
      );

      this.entrantInfo = details;
    },
  },
  watch: {},
  mounted() {
    // 获取购买者列表
    this.getPurchaseList();
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

<style scoped></style>
