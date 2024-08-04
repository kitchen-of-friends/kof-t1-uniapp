<template>
  <uni-swiper-dot
    mode="round"
    :dots-styles="dotStyle"
    :info="banner"
    :current="current"
  >
    <swiper
      :style="{ width: bannerWidth, height: bannerHeight }"
      @change="change"
      circular
    >
      <swiper-item v-for="(img, index) in banner" :key="index">
        <image
          mode="aspectFill"
          :style="{ width: bannerWidth, height: bannerHeight }"
          :src="img"
        ></image>
      </swiper-item>
    </swiper>
  </uni-swiper-dot>
</template>

<script>
export default {
  name: "banner-swiper",
  props: {
    banner: {
      type: Array,
    },
    bannerHeight: {
      type: String,
      default: "926rpx",
    },
    bannerWidth: {
      type: String,
      default: "750rpx",
    },

    // 选中指示点颜色
    selectedColor: {
      type: String,
    },
    // 未选择指示点颜色
    backgroundColor: {
      type: String,
    },
  },
  data() {
    return {
      current: 0,
    };
  },
  computed: {
    dotStyle() {
      return {
        backgroundColor: this.backgroundColor,
        border: this.backgroundColor + " 1px solid",
        selectedBackgroundColor: this.selectedColor,
        selectedBorder: this.selectedColor + " 1px solid",
        bottom: "24rpx",
      };
    },
  },
  methods: {
    // 获取当前索引点
    change(e) {
      this.current = e.detail.current;
    },
  },
  watch: {},
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

<style scoped></style>
