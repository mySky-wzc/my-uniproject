<template>
	<view class="content">
		<view>{{title}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '我的'
			}
		},
		onLoad() {
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
