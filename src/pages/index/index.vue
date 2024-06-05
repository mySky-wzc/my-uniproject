<template>
	<view class="content">
		<div v-for="(item,index) in funcList" :key="index" class="funcItem" @click="toPath(item.path)">
			<u--image :src="item.pic" width="50px" height="50px" />
			<div>{{item.name}}</div>
		</div>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
			}
		},
		onLoad() {
			
		},
		computed: {
			...mapGetters(["funcList"])
		},
		methods: {
			toPath(row) {
				uni.navigateTo({
					url: row
				});
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 10px;
		flex-wrap: wrap;
	}
	.funcItem{
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
		width: 30%;
		height: 100px;
		box-shadow: 0 0 5px #000;
		border-radius: 10px;
		margin: 5px;
	}
</style>
