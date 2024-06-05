<template>
  <div class="logist_detail">
    <div class="top">
        <img :src="result.logo" alt="" srcset="">
        <div>
            <div>{{result.typename}}</div>
            <div>{{result.number}}</div>
        </div>
    </div>
    <u-divider></u-divider>
    <div class="content">
        <u-steps :current="result.list.length" dot direction="column">
		    <u-steps-item v-for="(item,index) in result.list" :key="index" :title="item.status" :desc="item.time" />
        </u-steps>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            searchKey: "",
            result: {},
        };
    },
    onLoad() {
        var that = this;
        uni.getStorage({
            key: 'logistDetail',
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
        padding: 0 20px;
        .top{
            display: flex;
            align-items: center;
            margin-top: 10px;
            img{
                width: 100px;
                height: 100px;
                border-radius: 20px;
                box-shadow: 0 0 5px #ccc;
                margin-right: 10px;
            }
        }
        .u-divider{
            margin: 5px 0;
        }
        .content{
            .u-steps-item{
                padding-bottom: 15px;
            }
        }
    }
</style>