<template>
  <view v-if="loaded">
    <navigate-bar :mid-text="'详情'"></navigate-bar>
    <!-- 资源图片 -->
    <banner-swiper
      :banner="resourceDetail.img_list"
      :selected-color="ecoColor"
      :backgroundColor="ecoColor"
    ></banner-swiper>

    <view class="kof-subheader" style="margin: 24rpx 32rpx 28rpx 32rpx">{{
      resourceDetail.name
    }}</view>
    <!-- 时间地点 -->
    <view style="margin: 24rpx 32rpx 0rpx 32rpx">
      <view
        class="list"
        style="border-bottom: 1px solid #f9fafb; margin-bottom: 24rpx"
        >时间：
        {{ this.$formatDateTime(resourceDetail.start_time, "formatB") }} ~
        {{ this.$formatDateTime(resourceDetail.end_time, "formatC") }}</view
      >
      <view class="row-between list">
        <view style="width: 85%"
          >地点：{{
            resourceDetail.is_virtual
              ? "线上活动"
              : resourceDetail.loc_info.name +
                "（" +
                resourceDetail.loc_info.address +
                "）"
          }}
        </view>
        <view
          style="
            width: 80rpx;
            height: 80rpx;
            display: flex;
            align-items: center;
            justify-content: flex-end;
          "
          @click="showGps"
        >
          <uni-icons type="location-filled" color="#F24E4E" size="24" />
        </view>
      </view>
    </view>
    <!-- 分割线 -->
    <view style="width: 750rpx; height: 12rpx; background: #f9fafb"></view>
    <!-- 详情说明  -->
    <view style="margin: 24rpx 32rpx">
      <view style="font-size: 13px; font-weight: 500; margin-bottom: 20rpx"
        >活动详情</view
      >
      <zero-markdown-view
        :markdown="resourceDetail.content"
      ></zero-markdown-view>

      <!-- 最近参与 -->
      <entrants-list :gid="resourceDetail.ID"></entrants-list>
    </view>
    <!-- 底部栏 -->
    <view style="height: calc(env(safe-area-inset-bottom) + 144rpx)"></view>
    <bottom-bar :item-detail="resourceDetail"></bottom-bar>
  </view>
  <view v-else>
    <loading>加载中</loading>
  </view>
</template>

<script>
import bottomBar from "./components/bottom-bar.vue";
import entrantsList from "./components/entrants-list.vue";
export default {
  components: {
    bottomBar,
    entrantsList,
  },
  data() {
    return {
      ecoColor: uni.getStorageSync("ecoColor"),
      resourceDetail: {},
      loaded: false,
    };
  },
  computed: {},
  methods: {
    // 获取活动详情
    async fetchActivityDetail(id) {
      try {
        const response = await this.$request("0303", {
          eco_id: getApp().globalData.eco_id,
          class: "O",
          cat: 1,
          withCreator: true,
          withTree: true,
          withStats: true,
          withInteract: true,
          reply_to_id: id,
          sort: "floor",
        });
        this.resourceDetail = response.data.data[0];

        this.loaded = true;
      } catch (error) {
        console.error("Failed to fetch resource detail:", error);
      }
    },
    // 活动位置导航
    showGps() {
      uni.openLocation({
        latitude: this.resourceDetail.loc_geo.coordinates[1],
        longitude: this.resourceDetail.loc_geo.coordinates[0],
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.fetchActivityDetail(options.resourceId);
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
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

<style scoped>
.list {
  font-size: 12px;
  font-weight: 400;
  color: #667085;
  padding-bottom: 24rpx;
}

.post-comment-container {
  height: 216rpx;
  width: 750rpx;
  border-top: 1px solid #eaecf0;
  position: fixed;
  bottom: 0;
  padding-bottom: env(safe-area-inset-bottom);
  background: #fff;
}

.list-container {
  width: 678rpx;
  height: auto;
  box-sizing: border-box;
  border-bottom: 0.5px solid #eaecf0;
  margin: 36rpx 36rpx 0rpx 36rpx;
}

input {
  height: 72rpx;
  width: 430rpx;
  font-size: 14px;
}
</style>
