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
    };
  },
  mounted() {
    this.baiduMap();
  },
  props: {
    trackData: Object,
  },
  watch: {
    trackData(data) {
      const { trackingPoints, clusters } = data;
      trackingPoints.forEach((x) => {
        this.addPoint(x.long, x.lat);
      });
      // clusters.forEach((x) => {
      //   this.addCircle(x.center.long, x.center.lat);
      // });

      const firstTrackingPoint =
        trackingPoints && trackingPoints.length > 0 && trackingPoints[0];
      if (firstTrackingPoint) {
        const point = new BMap.Point(
          firstTrackingPoint.long,
          firstTrackingPoint.lat
        );
        this.map.centerAndZoom(point, 6);
      }
    },
  },
  methods: {
    addPoint: function (longitude, latitude) {
      if (!this.map) return;
      let point = new BMap.Point(longitude, latitude);
      let circle = new BMap.Circle(point, 2000, {
        strokeColor: "red",
        fillColor: "red",
      });
      this.map.addOverlay(circle);
    },
    addCircle: function (longitude, latitude) {
      if (!this.map) return;
      let point = new BMap.Point(longitude, latitude);
      let circle = new BMap.Circle(point, 4000, {
        strokeColor: "red",
        // fillColor: "red",
      });
      this.map.addOverlay(circle);
    },
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

      this.map = new BMap.Map("map");
      this.map.addTileLayer(tileLayer);
      this.map.enableScrollWheelZoom(true);
      this.map.addControl(new BMap.NavigationControl());
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
  width: 95%;
  height: 600px;
}
/* 去除地图上，左下字体标注 */
.anchorBL {
  display: none;
}
</style>