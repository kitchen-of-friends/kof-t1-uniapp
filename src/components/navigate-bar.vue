<template>
  <view>
    <view
      :style="{
        height: navBarHeight + 'px',
        zIndex: zIndex,
        position: position,
        background: bcColor,
      }"
      class="nav-bar-container"
    >
      <view :style="{ paddingTop: navTopMargin + 'px' }">
        <view class="row-center">
          <!-- 左半部分 -->
          <view>
            <!-- 自定义插槽 -->
            <view v-if="$slots.left">
              <slot name="left"></slot>
            </view>
            <view v-else>
              <!-- Mode1 常规返回图标 -->
              <view
                class="row-center"
                v-if="navMode === 1"
                @click="clickBackHandler"
              >
                <uni-icons type="back" color="#475467" size="14" />
                <view style="font-size: 12px; margin-left: 4rpx">{{
                  leftText
                }}</view></view
              >
              <!-- Mode2 胶囊型 -->
              <view v-if="navMode === 2" class="capsule-container">
                <view
                  style="
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    align-items: center;
                    margin: 4rpx 12rpx;
                  "
                >
                  <uni-icons
                    type="back"
                    size="24"
                    color="#000000"
                    @click="clickBackHandler"
                  />
                  <view
                    style="
                      height: 37rpx;
                      width: 1rpx;
                      background-color: #ebebeb;
                    "
                  ></view>
                  <uni-icons
                    type="home"
                    size="24"
                    color="#000000"
                    @click="switchHomeHandler"
                  />
                </view>
              </view>
            </view>
          </view>
          <!-- 中间部分 -->
          <view class="center-item">
            <view v-if="$slots.middle">
              <slot name="middle"></slot>
            </view>
            <view v-else style="font-weight: 500; font-size: 14px">{{
              midText
            }}</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 占位符 -->
    <view v-if="isNeeded" :style="'height: ' + navBarHeight + 'px;'"></view>
  </view>
</template>

<script>
export default {
  props: {
    // 导航栏左侧模式
    navMode: {
      type: Number,
      default: 1,
    },

    // 导航栏样式
    bcColor: {
      type: String,
      default: "#fff",
    },
    zIndex: {
      type: Number,
      default: 999,
    },
    position: {
      type: String,
      default: "fixed",
    },

    // 是否需要占位符
    isNeeded: {
      type: Boolean,
      default: true,
    },

    // 导航栏文字
    midText: {
      type: String,
    },
    leftText: {
      type: String,
      default: "返回",
    },

    // 函数处理
    clickBack: {
      type: Function,
    },
    switchHome: {
      type: Function,
    },
  },
  data() {
    return {
      navBarHeight: getApp().globalData.navBarHeight + 8,
      navTopMargin: getApp().globalData.navTopMargin,
    };
  },
  computed: {},
  methods: {
    clickBackHandler() {
      if (this.clickBack) {
        this.clickBack();
      } else {
        // Default behavior
        uni.navigateBack({
          delta: 1,
        });
      }
    },
    switchHomeHandler() {
      if (this.switchHome) {
        this.switchHome();
      } else {
        // Default behavior
        uni.switchTab({ url: "/pages/landing/index" });
      }
    },
  },

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
.nav-bar-container {
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 24rpx;
}
.center-item {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.capsule-container {
  width: 174rpx;
  border: 1rpx solid #ebebeb;
  border-radius: 50rpx;
}
</style>
