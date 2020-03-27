<template>
  <div class="point">
    <div class="circle1" />
    <div class="circle2" />
    <div class="circle3" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'PointIcon',
});
</script>

<style lang="less" scoped>
.point {
  position: absolute;
  display: grid;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.6);
  transition: translate 0.5 ease;
  user-select: none;
  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }

  > div {
    grid-row: 1/1;
    grid-column: 1/1;
    align-self: center;
    justify-self: center;
  }

  .circle1 {
    pointer-events: none;
    user-select: none;
    width: 85%;
    height: 85%;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
  }
  .circle2 {
    pointer-events: none;
    user-select: none;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
  }
  .circle3 {
    pointer-events: none;
    user-select: none;
    width: 60%;
    height: 60%;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
  }
}
</style>
