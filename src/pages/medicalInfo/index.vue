<template>
  <div>
    <div class="container">
      <ec-canvas class="canvas" id="mychart-dom-bar" canvas-id="mychart-bar" :ec="ec"></ec-canvas>
      <!-- <map class="map"  ></map> -->
    </div>
  </div>
</template>

<script>
const options = {
  series: [
    {
      name: "省",
      type: "map",
      map: "china",
      roam: false,
      zoom: 1.2,
      aspectScale: 0.75,
      label: {
        normal: {
          show: true,
          textStyle: {
            color: "rgba(0,0,0,0.4)"
          }
        }
      },
      itemStyle: {
        normal: {
          areaColor: "rgba(0,255,236,0.1)",
          borderColor: "rgba(118,237,236,1)"
        },
        emphasis: {
          areaColor: "rgba(118,237,236,0.8)",
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          borderWidth: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    }
  ]
}

export default {
  data() {
    return {
      ec: {
        // 传 options
        options: options
      }
    }
  }
}
</script>

<style>
ec-canvas {
  width: 400px;
  height: 400px;
}
</style>