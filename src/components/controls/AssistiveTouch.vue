<template>
  <div class="assistive-touch">
    <Point v-show="mode === 1" :mode="mode" @click="openModal" />
    <div v-show="mode === 2" class="menu" @click="closeMenu"></div>
    <div v-show="mode === 3" class="pad" @click="closeModal"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Point from './Point.vue';

export const MODE = {
  POINT: 1,
  MENU: 2,
  PAD: 3,
  NONE: -1,
};

export default Vue.extend({
  name: 'AssistiveTouch',
  components: { Point },
  data() {
    return {
      mode: MODE.POINT,
      menus: [],
    };
  },
  methods: {
    openMenu() {
      this.mode = MODE.MENU;
    },
    closeMenu() {
      this.mode = MODE.POINT;
    },
    openModal() {
      console.debug('openPad1');
      console.debug('openPad2');
      this.mode = MODE.PAD;
    },
    closeModal() {
      this.mode = MODE.POINT;
    },
    clickElsewhere(event: MouseEvent) {
      if ((this.$el as Node).contains(event.target as Node)) {
        return;
      }
      this.closeMenu();
      this.closeModal();
    },

    addEventListeners() {
      document.addEventListener('click', this.clickElsewhere.bind(this), true);
    },
    removeEventListeners() {
      document.removeEventListener(
        'click',
        this.clickElsewhere.bind(this),
        true
      );
    },
  },
  mounted() {
    this.addEventListeners();
  },
  beforeDestroy() {
    this.removeEventListeners();
  },
});
</script>

<style lang="less" scoped>
.assistive-touch {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
}

.menu {
  width: 10rem;
  height: 10rem;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
}

.pad {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 999;
}
</style>
