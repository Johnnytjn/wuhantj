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
      if (!data) {
        return;
      }
      const persons = Object.entries(data.trackingPoints);
      persons.forEach(([person, pointData], idx) => {
        const lineColor =
          idx === 0
            ? "red"
            : "rgb(" +
              [
                Math.round(Math.random() * 256),
                Math.round(Math.random() * 256),
                Math.round(Math.random() * 256),
              ].join(",") +
              ")";
        pointData.forEach((x, idx) => {
          if (idx <= pointData.length - 2) {
            const fromPoint = pointData[idx];
            const toPoint = pointData[idx + 1];
            this.addHistoryLine(fromPoint, toPoint, lineColor);
            this.addPoint(fromPoint);
            this.addPoint(toPoint);
          }
        });
      });
      const firstTrackingPoint =
        persons &&
        persons.length > 0 &&
        persons[0].length > 0 &&
        persons[0][1][0];
      if (firstTrackingPoint) {
        setTimeout(() => {
          const point = new BMap.Point(
            firstTrackingPoint.long,
            firstTrackingPoint.lat
          );
          this.map.centerAndZoom(point, 9);
        }, 200);
      }
    },
  },
  methods: {
    addHistoryLine: function (from, to, color) {
      if (!this.map) return;
      let pointFrom = new BMap.Point(from.long, from.lat);
      let pointTo = new BMap.Point(to.long, to.lat);
      let line = new BMap.Polyline([pointFrom, pointTo], {
        strokeWeight: 3,
        strokeColor: color,
      });
      this.map.addOverlay(line);
    },
    addPoint: function (p) {
      if (!this.map) return;
      const pointColor = p.type === 0 ? "red" : "blue";
      let point = new BMap.Point(p.long, p.lat);
      let circle = new BMap.Circle(point, 200, {
        strokeColor: pointColor,
        fillColor: pointColor,
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
      // setTimeout(() => {
      //   let point = new BMap.Point(120.187564, 30.262842);
      //   this.map.centerAndZoom(point, 9);
      // }, 500);
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