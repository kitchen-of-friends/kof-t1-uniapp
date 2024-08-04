<template>
  <view>
    <!-- 导航栏 -->
    <navigate-bar :is-needed="false" :bc-color="'#ffffff00'">
      <template #left></template>
      <template #middle>
        <image
          :src="ecoInfo.avatar"
          style="width: 64rpx; height: 64rpx"
        ></image>
      </template>
    </navigate-bar>
    <!-- 首页轮播图 -->
    <banner-swiper
      :banner="banner"
      :selected-color="ecoColor"
      :backgroundColor="ecoColor"
    ></banner-swiper>
    <!-- 活动列表 -->
    <resource-list v-if="loaded" ref="resourceList"></resource-list>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      ecoInfo: {},
      ecoColor: "",
      banner: [],
      loaded: false,
    };
  },
  async onLoad() {
    // 获取生态信息
    const eco_id = getApp().globalData.eco_id;
    const ecores = await this.$request("0204", {
      id: eco_id,
    });
    this.ecoInfo = ecores.data;
    this.ecoColor = ecores.data.config.theme_color;
    await Promise.all([
      uni.setStorage({
        key: "ecoColor",
        data: ecores.data.config.theme_color,
      }),
      uni.setStorage({
        key: "ecoInfo",
        data: {
          avatar: this.ecoInfo.avatar,
          name: this.ecoInfo.name,
          default_username: this.ecoInfo.config.dft_username[0],
          default_avatar: this.ecoInfo.config.dft_avatar_list[0],
        },
      }),
    ]);
    this.loaded = true;
    // 获取首页海报
    const response = await this.$request("0303", {
      eco_id: eco_id,
      class: "C",
      cat: 6,
    });
    this.banner = response.data.data[0].img_list;
  },
  methods: {},
  onReachBottom() {
    this.$refs.resourceList.loadMore();
  },
};
</script>

<style></style>
../../components/banner-swiper.vue
