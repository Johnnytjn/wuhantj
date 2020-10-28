<template>
  <div id="MapBox">
    <div class="baiduMap" id="map"></div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      map: undefined,
      overView: undefined,
      marker: undefined,
    };
  },
  mounted() {
    this.baiduMap();
  },
  methods: {
    baiduMap: function () {
      const tileConfig = {
        tiles_ext: ".png",
        tiles_dir: "static/lib/maptile",
        home: "",
      };

      let tileLayer = new BMap.TileLayer({
        isTransparentPng: true,
      });

      tileLayer.getTilesUrl = function (tileCoord, zoom) {
        let x = tileCoord.x;
        let y = tileCoord.y;
        return (
          tileConfig.tiles_dir +
          "/" +
          zoom +
          "/" +
          x +
          "/" +
          y +
          tileConfig.tiles_ext
        );
      };

      let map = new BMap.Map("map");
      map.addTileLayer(tileLayer);
      // map.enableScrollWheelZoom(true);
      map.addControl(new BMap.NavigationControl());
      setTimeout(() => {
        let point = new BMap.Point(116.187564, 39.262842);
        map.centerAndZoom(point, 6);
      }, 500);
    },
  },
});
</script>
<style>
#MapBox {
  padding: 10px;
  position: relative;
  display: flex;
  justify-content: center;
}
/* 地图 */
.baiduMap {
  width: 90%;
  height: 600px;
}
/* 去除地图上，左下字体标注 */
.anchorBL {
  display: none;
}
</style>