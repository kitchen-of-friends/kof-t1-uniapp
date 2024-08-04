<template>
  <view class="page-container">
    <navigate-bar :mid-text="'我的报名'" :nav-mode="2"></navigate-bar>
    <view v-if="loaded">
      <order-item
        v-for="(order, index) in postOrPurchaseList"
        :key="index"
        :order-detail="order"
      ></order-item>
      <uni-load-more
        iconType="circle"
        :status="hasMore ? 'loading' : 'noMore'"
        :iconSize="18"
        color="#98a2b3"
        :content-text="contentText"
      />
    </view>
  </view>
</template>

<script>
import orderItem from "./components/order-item.vue";
export default {
  components: {
    orderItem,
  },
  data() {
    return {
      postOrPurchaseList: [],
      currentPage: 1,
      loaded: false,
      hasMore: false,
      contentText: {
        contentrefresh: "加载更多",
        contentnomore: "到底啦",
      },
    };
  },
  computed: {},
  methods: {
    async getPurchaseList() {
      // 获取临时订单列表
      const userInfo = uni.getStorageSync("userInfo");
      const userId = userInfo.id;
      const response = await this.$request("0309", {
        owner_addr: userId,
        page: this.currentPage,
        pageSize: 5,
      });

      const tempList = response.data.data;

      // 遍历tempList并发起每个商品的详细信息请求
      for (const item of tempList) {
        try {
          const res = await this.$request("0303", {
            eco_id: getApp().globalData.eco_id,
            withCreator: true,
            withTree: true,
            withStats: true,
            withInteract: true,
            reply_to_id: item.goods_id,
            sort: "floor",
            pageSize: 1,
          });

          // 构造商品详情信息并推送到postOrPurchaseList
          const detail = {
            ...res.data.data[0],
            purchaseAt: item.CreatedAt,
            order_id: item.order_id,
            ticket_step: item.ticket_step,
            price_name: item.price_name,
            PriceIndex: item.PriceIndex,
            goods_id: item.goods_id,
          };
          this.postOrPurchaseList.push(detail);
        } catch (error) {
          console.error("获取商品详情失败", error);
        }
      }
      uni.hideLoading();
      this.hasMore = response.data.hasMore;
      this.loaded = true;
    },
  },

  async onLoad() {
    // 判断用户是否登录
    const res = uni.getStorageInfoSync();
    if (res.keys.includes("userInfo")) {
      uni.showLoading({
        title: "加载中",
      });

      this.getPurchaseList();
    } else {
      uni.showToast({
        title: "请先登录",
        icon: "error",
        duration: 2000,
        complete: () => {
          setTimeout(() => {
            uni.navigateBack();
          }, 1000);
        },
      });
    }
  },
  onReachBottom() {
    if (this.hasMore) {
      this.currentPage += 1;
      this.getPurchaseList();
    }
  },
};
</script>

<style scoped>
.page-container {
  background-color: #f9fafb;
  width: 100%;
  padding-bottom: 48rpx;
  min-height: 96vh;
}
</style>
