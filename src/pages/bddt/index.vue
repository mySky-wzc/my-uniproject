<template>
  <div id="allmap"></div>
</template>

<script>
var BMapGL = window.BMapGL;
export default {
    data() {
        return {

        }
    },
    onLoad() {
        this.$nextTick(() =>{
            this.initMap();
        })
    },
    methods: {
        initMap() {
            var that = this;
            var map = new BMapGL.Map("allmap");
            //   map.setMapType(BMAP_SATELLITE_MAP);
            //   1.标准地图：BMAP_NORMAL_MAP
            // 2.地球模式：BMAP_EARTH_MAP
            // 3.普通卫星地图：BMAP_SATELLITE_MAP
            var point = new BMapGL.Point(116.404, 39.915);
            map.centerAndZoom(point, 15); // 初始化地图,设置中心点坐标和地图级别
            map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
            var scaleCtrl = new BMapGL.ScaleControl(); // 添加比例尺控件
            map.addControl(scaleCtrl);
            var zoomCtrl = new BMapGL.ZoomControl(); // 添加缩放控件
            map.addControl(zoomCtrl);
            var cityCtrl = new BMapGL.CityListControl(); // 添加城市列表控件
            map.addControl(cityCtrl);
            var locationControl = new BMapGL.LocationControl();
            map.addControl(locationControl);
            var geolocation = new BMapGL.Geolocation();
            // 开启SDK辅助定位
            geolocation.enableSDKLocation();
            geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    point = r.point;
                    map.centerAndZoom(point, 15);
                    var mk = new BMapGL.Marker(point);
                    map.addOverlay(mk);
                } else {
                    uni.showToast({
                        title: '获取位置失败',
                        icon: 'none'
                    });
                }
            });
            //   map.setHeading(64.5);   //设置地图旋转角度
            //   map.setTilt(73);       //设置地图的倾斜角度
        }
    }
}
</script>

<style lang="scss" scoped>
#allmap{
    height: 50vh;
}
</style>