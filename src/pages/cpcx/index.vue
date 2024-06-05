<template>
  <view class="content">
    <u-toast ref="toast"></u-toast>
    <view class="search">
      <u-search
        v-model="searchKey"
        clearabled
        placeholder="搜你想吃的"
        @search="query"
        @custom="query"
      ></u-search>
    </view>
    <template v-if="resultList.length === 0">
        <view style="text-align: center"><image src="/static/noOrders.png"></image></view>
        <view class="tip">搜索美味，即刻到来</view>
    </template>
    <div class="content-info" v-if="resultList.length">
        <div v-for="(item,index) in resultList" :key="item.number" class="content-item" @click="toPath(index)">
            <div class="top">
                <img :src="item.pic" alt="" srcset="">
                <view class="rinfo">
                    <view class="title">{{item.name + "（" + item.cookingtime + "）"}}</view>
                    <view class="bottom">{{item.tag}}</view>
                </view>
            </div>
        </div>
    </div>
  </view>
</template>

<script>
export default {
  data() {
    return {
      searchKey: "",
      resultList: []
    };
  },
  onLoad() {},
  methods: {
    toPath(index) {
        var that = this;
        uni.setStorage({
            key: 'foodDetail',
            data: JSON.stringify(that.resultList[index]),
        })
        uni.navigateTo({
			url: "/pages/cpcx/detail"
		});
    },
    query: _.debounce(function () {
        var that = this;
        if (!that.searchKey) {
            that.$refs.toast.show({
            type: "error",
            message: "请输入搜索内容",
            });
            return;
        }
        var url = uni.getSystemInfoSync().uniPlatform == "mp-weixin" ? "https://api.binstd.com" : "/binstd";
        uni.showLoading({
            title: '加载中',
            mask: true
        });
        uni.request({
            url: `${url}/recipe/search`,
            data: {
                num: 20,
                keyword: _.trim(that.searchKey),
                appkey: "760c88cb0e699bf8",
            },
            success: (res) => {
                if(res.data.status != 0) {
                    that.$refs.toast.show({
                        type: "error",
                        message: res.data.msg,
                    });
                    return;
                }
                that.resultList = res.data.result.list;
            },
            fail: (res) => {
            },
            complete() {
                uni.hideLoading();
            }
        });
    }, 300),
  },
};
</script>

<style lang="scss" scoped>
.content {
    padding: 10px;
}
.search {
  display: flex;
  align-items: center;
  width: 100%;
}
.tip{
    text-align: center;
}
.content-info{
    .content-item{
        margin-top: 3px;
        border-radius: 5px;
        padding: 10px;
        box-shadow: 0 0 3px #ccc;
        .top{
            display: flex;
            img{
                width: 100px;
                height: 100px;
                margin-right: 10px;
            }
            .rinfo{
                .bottom{
                    font-size: 12px;
                    color: #ccc;
                    margin-top: 10px;
                }
            }
        }
    }
}
</style>
