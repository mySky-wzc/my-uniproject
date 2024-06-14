<template>
  <view class="content">
    <view class="box">
        <div v-for="(item,index) in gameInfo.puzzle" :key="index" class="eachRow">
            <div v-for="(jtem,jindex) in item" :key="jindex" :style="{background: jtem.disabled ? '#ceeffa' : ''}">
                <text v-if="jtem.disabled">{{jtem.value}}</text>
                <u--input v-else type="number" maxlength="1" v-model="item[jindex].value" />
            </div>
        </div>
    </view>
    <button style="margin-top: 50px" type="primary" @click="checkResult">提交</button>
  </view>
</template>

<script>
export default {
    data() {
        return {
            result: "",
            gameInfo: {},
            nowTime: null,
            endTime: null
        }
    },
    onLoad() {
        var that = this;
        uni.getStorage({
            key: 'difficulty',
            success: (res) => {
                that.result = JSON.parse(res.data);
                that.getGame();
            }
        });
    },
    methods: {
        getGame() {
            var that = this;
            var url = uni.getSystemInfoSync().uniPlatform == "mp-weixin" ? "https://apis.juhe.cn" : "/juhe";
            uni.showLoading({
                title: '加载中',
                mask: true
            });
            uni.request({
                url: `${url}/fapig/sudoku/generate`,
                data: {
                    difficulty: that.result,
                    key: "686e61ad69c2a5b7bda246dca682d05d",
                },
                success: (res) => {
                    if(res.data.error_code != 0) {
                        uni.showToast({
                           icon: "error",
                           title: res.data.reason
                        })
                    } else {
                        that.gameInfo = res.data.result;
                        console.log(this.gameInfo,"gameInfo");
                        that.gameInfo.puzzle.forEach(item =>{
                            item.forEach((jtem,jindex) => {
                                item[jindex] = {
                                    value: jtem == 0 ? undefined : jtem,
                                    disabled: jtem != 0
                                }
                            })
                        })
                        this.nowTime = new Date().getTime();
                    }
                },
                fail: (res) => {
                },
                complete() {
                    uni.hideLoading();
                }
            })
        },
        checkResult() {
            var that = this;
            var flag = _.find(that.gameInfo.puzzle,item => _.find(item, jtem => !jtem.value || jtem.value == 0));
            if(flag) {
                uni.showToast({
                    icon: "error",
                    title: "请填写完整答案"
                })
                return;
            }
            var flag1 = true;
            for(var i = 0; i < 9; i++) {
                for(var j = 0; j < 9; j++) {
                    if(that.gameInfo.puzzle[i][j].value != that.gameInfo.solution[i][j]) {
                        flag1 = false;
                        break;
                    }
                }
                if(!flag1) break;
            }
            that.endTime = new Date().getTime();
            var date3 = that.endTime - that.nowTime;
            const hours = Math.floor(date3 / 3600000);
            const minutes = Math.floor((date3 % 3600000) / 60000);
            const seconds = Math.floor((date3 % 60000) / 1000);
            uni.showModal({
                title: "提示",
                content: !!flag1 ? `恭喜你，成功咯！！！花费${hours ? (hours + "小时") : ""}${minutes ? "分" : ""}${seconds}秒` : "失败咯！！！",
                cancelText: "返回",
                confirmText: "重玩",
                success: function (res) {
                    if (res.confirm) {
                        uni.redirectTo({
                            url: "/pages/sdyx/detail"
                        })
                    } else if (res.cancel) {
                        uni.navigateBack({
                            delta: 1
                        })
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .content {
        .box{
            width: 100%;
            .eachRow{
                display: flex;
                justify-content: space-around;
                align-items: center;
                >div{
                    flex: 1;
                    text-align: center;
                    height: 40px;
                    line-height: 40px;
                    width: 10%;
                    border: 1px solid #00b5ff;
                    ::v-deep .u-input{
                        width: 100%;
                        height: 40px;
                        border: none;
                        line-height: 40px;
                        padding: 0 !important;
                        .u-input__content__field-wrapper__field{
                            text-align: center !important;
                        }
                    }
                }
            }
        }
        .sumbitBtn{
            margin-top: 50px;
        }
    }
</style>