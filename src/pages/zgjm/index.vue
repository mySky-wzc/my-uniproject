<template>
  <view class="content">
    <u-toast ref="toast"></u-toast>
    <view class="search">
      <u-search
        v-model="searchKey"
        clearabled
        @search="query"
        @custom="query"
      ></u-search>
    </view>
    <u-cell-group class="detail" v-if="resultList.length">
      <u-cell v-for="(item, index) in resultList" :key="index">
        <div v-html="item.name" slot="title" />
        <div v-html="item.content" slot="label" />
      </u-cell>
    </u-cell-group>
  </view>
</template>

<script>
export default {
  data() {
    return {
      searchKey: "",
      resultList: [],
    };
  },
  onLoad() {},
  methods: {
    query: _.debounce(function () {
      console.log(1111111111);
      if (!this.searchKey) {
        this.$refs.toast.show({
          type: "error",
          message: "请输入搜索内容",
        });
        return;
      }
      var url = uni.getSystemInfoSync().uniPlatform == "mp-weixin" ? "https://api.jisuapi.com" : "/jisu";
      uni.request({
        url: `${url}/dream/search`,
        data: {
          appkey: "c01c81c0fca9c95b",
          keyword: _.trim(this.searchKey),
        },
        success: (res) => {
          console.log(res.data);
          this.resultList = res.data.result;
        },
        fail: (res) => {
          console.log(res, 2222222222);
        },
      });
    }, 300),
  },
};
</script>

<style lang="scss">
.content {
  padding: 20px;
}
.search {
  display: flex;
  align-items: center;
  width: 100%;
}
.detail {
  margin-top: 20px;
}
</style>
