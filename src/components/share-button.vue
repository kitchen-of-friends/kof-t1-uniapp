<template>
  <button open-type="share">
    <uni-icons type="paperplane" :color="color" :size="size" />
  </button>
</template>

<script>
export default {
  name: "share-button",
  props: {
    size: {
      type: Number,
      default: 18,
    },
    color: {
      type: String,
      default: "#98A2B3",
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
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

<style scoped>
button {
  height: 48rpx;
  width: 48rpx;
  margin: 0rpx;
  background: #fff;
}
</style>
