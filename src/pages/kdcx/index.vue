<template>
  <view class="content">
    <u-toast ref="toast"></u-toast>
    <view class="title">快递查询</view>
    <view class="search">
      <u-search
        v-model="searchKey"
        clearabled
        @search="query"
        @custom="query"
      ></u-search>
    </view>
    <div class="content-info">
        <div v-for="(item,index) in resultList" :key="item.number" class="content-item" @click="toPath(index)">
            <div class="top">
                <img :src="item.logo" alt="" srcset="">
                <view class="rinfo">
                    <text class="com">{{item.typename}}</text>
                    <text class="num">{{item.number}}</text>
                    
                </view>
            </div>
            <view class="bottom">{{item.list[0].status}}</view>
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
            key: 'logistDetail',
            data: JSON.stringify(that.resultList[index]),
        })
        uni.navigateTo({
			url: "/pages/kdcx/detail"
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
        if(_.find(that.resultList,item => item.number == _.trim(that.searchKey))) {
            that.$refs.toast.show({
            type: "error",
            message: "该单号已查询，结果在下方列表中",
            });
            return;
        }
        var url = uni.getSystemInfoSync().uniPlatform == "mp-weixin" ? "https://api.binstd.com" : "/binstd";
        uni.showLoading({
            title: '加载中',
            mask: true
        });
        uni.request({
            url: `${url}/express/query`,
            data: {
            type: "auto",
            number: _.trim(that.searchKey),
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
                that.resultList.push(res.data.result)
            },
            fail: (res) => {
            console.log(res, 2222222222);
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
    padding: 0 20px;
    .title{
        font-size: 24px;
        text-align: center;
        margin: 10px;
        font-weight: bold;
        color: #f9ae3d;
    }
}
.search {
  display: flex;
  align-items: center;
  width: 100%;
}
.content-info{
    margin: 0 10px;
    .content-item{
        margin-top: 20px;
        border-radius: 5px;
        padding: 10px;
        box-shadow: 0 0 3px #ccc;
        .top{
            display: flex;
            align-items: center;
            img{
                width: 50px;
                height: 50px;
                border-radius: 50px;
            }
        }
        .bottom{
            margin: 0;
            width: 100%;
            color: #666;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }
}
</style>
