<template>
	<view class="content">
		<view class="headInfo">
			<template v-if="platform == 'web'">
				<button
					class="van-button van-button--primary van-button--normal van-button--block btn-getnum"
					@click="getUserInfo"
				>授权手机号</button>
			</template>
			<template v-else>
				<button
					class="van-button van-button--primary van-button--normal van-button--block btn-getnum"
					open-type="getPhoneNumber"
					@getphonenumber="getPhoneNumber"
				>授权手机号</button>

				<u-divider textPosition="left">获取头像和昵称（最新方式）</u-divider>
				<button
					class="avatar-wrapper"
					open-type="chooseAvatar"
					@chooseavatar="onChooseAvatar"
				>
					<img class="avatar" :src="avatarUrl" />
				</button>
				<input type="nickname" class="weui-input" placeholder="请输入昵称">
			</template>
		</view>
	</view>
</template>

<script>
import wx from "weixin-js-sdk";
export default {
	data() {
		return {
			avatarUrl: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0"
		}
	},
	onLoad() {
		console.log(this.platform,'初始化平台信息');
	},
	computed: {
		platform() {
			return uni.getSystemInfoSync().uniPlatform;
		}
	},
	methods: {
		getUserInfo() {
			var path = encodeURI(location.host);
			console.log(path,"当前路径");
			location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5a59cbee646221ef&redirect_uri=${path}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
		},
		getPhoneNumber(e) {
			console.log("获取手机号码：",e);
		},
		onChooseAvatar(e) {
			console.log("获取头像昵称：");
        	this.avatarUrl = e.detail.avatarUrl;
		},
	}
}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10px 20px;
	}
	.avatar-wrapper {
		padding: 0;
		text-align: center;
		width: 100px;
		height: 100px;
		border-radius: 100px;
	}
	.avatar-wrapper:after{
		border: none !important;
	}
	.avatar {
		border-radius: 100%;
		width: 100%;
		height: 100%;
	}
</style>
