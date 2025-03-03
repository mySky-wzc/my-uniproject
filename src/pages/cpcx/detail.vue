<template>
  <div class="logist_detail">
    <div class="top">
        <img :src="result.pic" alt="" srcset="">
    </div>
    <view style="text-align: center;font-size: 18px">{{result.name}}</view>
    <view style="padding: 0 20px;margin-top: 20px;" v-html="result.content"></view>
    <view style="text-align: center;margin: 20px 0;">--食材清单--</view>
    <view v-for="(item,index) in result.material" :key="index" class="material">
        <text>{{item.mname}}</text>
        <text>{{item.amount}}</text>
    </view>
    <view style="text-align: center;margin: 20px 0;">--烹饪步骤--</view>
    <view v-for="(item,index) in result.process" :key="index">
        <view style="padding: 0 20px;">{{index+1 + "、 " +item.pcontent}}</view>
        <view style="text-align: center;margin: 10px 0"><image :src="item.pic"></image></view>
    </view>
    <view style="text-align: center;margin: 20px; 0">--小贴士--</view>
    <view style="text-align: center;padding-bottom: 20px">{{result.tag}}</view>
  </div>
</template>

<script>
export default {
    data() {
        return {
            result: {},
        };
    },
    onLoad() {
        var that = this;
        uni.getStorage({
            key: 'foodDetail',
            success(e) {
                that.result = JSON.parse(e.data);
            }
        })
    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
    .logist_detail{
        .top{
            img{
                width: 100%;
                height: 250px;
            }
        }
        .material{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 20px 10px;
            padding: 5px;
            border-bottom: 1px solid #ccc;
        }
        .content{
            .u-steps-item{
                padding-bottom: 15px;
            }
        }
    }
</style>