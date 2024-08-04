<template>
  <view>
    <view class="container" v-for="(item, index) in resourceList" :key="index">
      <view class="item-container" @click="toResourceDetail(item)">
        <image
          :src="item.img_list[0]"
          mode="aspectFill"
          style="width: 186rpx; height: 160rpx; border-radius: 16rpx"
        ></image>
        <!-- 活动信息 -->
        <view class="info-container">
          <view class="row-between" style="width: 100%">
            <view class="one-line-ellipsis" style="font-size: 16px; width: 78%"
              >{{ item.name }}
            </view>
            <view
              style="font-size: 14px; font-weight: 500"
              :style="{ color: ecoColor }"
              >¥{{ (item.menu[0].price / 100).toFixed(2) }}</view
            >
          </view>

          <view class="row-center">
            <uni-icons type="calendar" color="#98a2b3" size="18" />
            <view class="kof-text" style="color: #98a2b3; margin-left: 12rpx">
              {{ this.$formatDateTime(item.start_time, "formatB") }}
            </view>
          </view>
          <view class="row-center">
            <uni-icons type="location" color="#98a2b3" size="18" />
            <view class="kof-text" style="color: #98a2b3; margin-left: 12rpx">
              {{ item.is_virtual ? "线上活动" : item.loc_info.name }}
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 加载更多按钮 -->
    <view v-if="resourceList.length !== 0" style="margin-top: 24rpx">
      <uni-load-more
        iconType="circle"
        :status="hasMore ? 'loading' : 'noMore'"
        :iconSize="18"
        color="#98a2b3"
        :content-text="contentText"
      />
    </view>
    <!-- 加载中 -->
    <view
      v-if="resourceList.length === 0"
      style="margin-top: 56rpx; display: flex; justify-content: center"
    >
      <image
        src="/static/loading.gif"
        style="width: 80rpx; height: 80rpx"
      ></image>
    </view>
  </view>
</template>

<script>
export default {
  name: "resource-item",
  props: {},
  data() {
    return {
      ecoColor: uni.getStorageSync("ecoColor"),
      resourceList: [],
      currentPage: 1,
      hasMore: false,
      contentText: {
        contentrefresh: "加载更多",
        contentnomore: "到底啦",
      },
    };
  },
  computed: {},
  methods: {
    async getresourceList() {
      const response = await this.$request("0303", {
        eco_id: getApp().globalData.eco_id,
        class: "O",
        cat: 1,
        withCreator: true,
        withTree: true,
        withStats: true,
        withInteract: true,
        page: this.currentPage,
        pageSize: 5,
      });
      this.hasMore = response.data.hasMore;
      this.resourceList.push(...response.data.data);
      this.resourceList.forEach((item) => {
        item.formattedCreatedAt = this.$formatDateTime(
          item.CreatedAt,
          "formatA"
        );
      });
    },
    loadMore() {
      if (this.hasMore) {
        this.currentPage += 1;
        this.getresourceList();
      }
    },
    toResourceDetail(item) {
      uni.navigateTo({
        url: `/modules/resource-pages/resource-detail-page?resourceId=${item.ID}`,
      });
    },
  },
  watch: {},
  // 组件周期函数--监听组件挂载完毕
  mounted() {
    this.currentPage = 1;
    this.getresourceList();
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

<style scoped>
.container {
  width: 750rpx;
  height: auto;
  margin-top: 48rpx;
  padding: 0rpx 28rpx;
  box-sizing: border-box;
}

.item-container {
  height: auto;
  width: full;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 40rpx;
  border-bottom: 1px solid #f2f4f7;
}

.info-container {
  height: 160rpx;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
  overflow: hidden;
  position: relative;
}
</style>
