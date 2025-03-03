<template>
    <div class="main">
        <div v-for="item in diffList" class="levelBtn" :key="item.key" @click="toPath(item.key)">{{item.name}}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            diffList: [
                {key: "easy",name: "简单"},
                {key: "normal",name: "普通"},
                {key: "hard",name: "困难"},
                {key: "veryhard",name: "非常难"}
            ]
        }
    },
    onLoad() {
    },
    methods: {
        toPath(key) {
            uni.setStorage({
                key: 'difficulty',
                data: JSON.stringify(key),
            })
            uni.navigateTo({
                url: "/pages/sdyx/detail",
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.main{
    margin-top: 100px;
    text-align: -webkit-center;
    .levelBtn{
        font-size: 20px;
        font-weight: bold;
        height: 50px;
        line-height: 50px;
        width: 50%;
        background: #5ac725;
        color: #fff;
        border-radius: 5px;
        +.levelBtn{
            margin-top: 20px;
        }
    }
}
</style>