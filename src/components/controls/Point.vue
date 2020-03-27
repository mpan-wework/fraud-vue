<template>
  <PointIcon v-if="mode === 1" :style="styleObject" />
</template>

<script lang="ts">
import Vue from 'vue';
import PointIcon from './PointIcon.vue';

export default Vue.extend({
  components: { PointIcon },
  props: {
    mode: {
      type: Number,
      default() {
        return -1;
      },
    },
  },
  data() {
    return {
      width: 50,
      height: 50,
      top: 0,
      left: 0,
      startMoving: false,
      moving: false,
    };
  },
  computed: {
    styleObject() {
      return {
        width: `${this.$data.width}px`,
        height: `${this.$data.height}px`,
        top: `${this.$data.top}px`,
        left: `${this.$data.left}px`,
      };
    },
  },
  methods: {
    canMovePoint(event: MouseEvent | TouchEvent) {
      if (this.mode != 1) {
        return false;
      }
      if (!(this.$el as Node).contains(event.target as Node)) {
        return false;
      }
      return true;
    },
    mouseup(event: MouseEvent) {
      event.stopPropagation();
      event.preventDefault();

      // console.debug('mouseup', this.moving, this.startMoving, event.target);
      if (this.startMoving) {
        this.startMoving = false;
        this.$nextTick(() => {
          this.$emit('click');
        });
      } else if (this.moving) {
        this.$nextTick(() => {
          this.moving = false;
          this.stickToBorder();
        });
      }
    },
    mousemove(event: MouseEvent) {
      if (!this.moving && !this.startMoving) {
        return;
      }

      event.stopPropagation();
      event.preventDefault();

      if (this.startMoving) {
        this.moving = true;
        this.startMoving = false;
      }

      this.top = Math.min(
        document.body.clientHeight,
        Math.max(0, event.clientY - this.height / 2)
      );
      this.left = Math.min(
        document.body.clientWidth,
        Math.max(0, event.clientX - this.width / 2)
      );
    },
    mousedown(event: MouseEvent) {
      if (!this.canMovePoint(event)) {
        return;
      }

      event.stopPropagation();
      event.preventDefault();

      console.debug('mousedown');
      this.startMoving = true;
    },
    touchstart(event: TouchEvent) {
      if (!this.canMovePoint(event)) {
        return;
      }
      event.stopPropagation();
      console.debug('touchstart', event.target, event);
    },
    touchmove(event: TouchEvent) {
      if (!this.canMovePoint(event)) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();

      this.top = Math.min(
        document.body.clientHeight,
        Math.max(0, event.touches[0].clientY - this.height / 2)
      );
      this.left = Math.min(
        document.body.clientWidth,
        Math.max(0, event.touches[0].clientX - this.width / 2)
      );
    },
    touchend(event: TouchEvent) {
      if (!this.canMovePoint(event)) {
        return;
      }

      event.stopPropagation();
      this.stickToBorder();
      console.debug('touchend', this.top, this.left);
    },
    touchcancel(event: TouchEvent) {
      if (!this.canMovePoint(event)) {
        return;
      }
      this.stickToBorder();
      console.debug('touchcancel', this.top, this.left);
    },
    stickToBorder() {
      const clientWidth = document.body.clientWidth;
      const clientHeight = document.body.clientHeight;
      const { left, top } = this.findPositionOnBorder(
        this.left,
        this.top,
        clientWidth - this.width,
        clientHeight - this.height
      );
      this.left = Math.max(
        this.width * 0.5,
        Math.min(clientWidth - this.width * 1.5, left)
      );
      this.top = Math.max(
        this.height * 0.5,
        Math.min(clientHeight - this.height * 1.5, top)
      );
    },
    findPositionOnBorder(
      left: number,
      top: number,
      width: number,
      height: number
    ) {
      const right = width - left,
        bottom = height - top;
      let newLeft = 0,
        newTop = 0;

      if (left < right) {
        if (top < bottom) {
          if (left < top) {
            newLeft = 0;
            newTop = top;
          } else {
            newLeft = left;
            newTop = 0;
          }
        } else {
          if (left < bottom) {
            newLeft = 0;
            newTop = top;
          } else {
            newLeft = left;
            newTop = height;
          }
        }
      } else {
        if (top < bottom) {
          if (top < right) {
            newLeft = left;
            newTop = 0;
          } else {
            newLeft = width;
            newTop = top;
          }
        } else {
          if (bottom < right) {
            newLeft = left;
            newTop = height;
          } else {
            newLeft = width;
            newTop = top;
          }
        }
      }

      console.debug(
        `left${left},right${right},width${width},top${top},bottom${bottom},height${height},newLeft:${newLeft},newTop:${newTop}`
      );
      return { top: newTop, left: newLeft };
    },
    addEventListeners() {
      document.addEventListener('mouseup', this.mouseup.bind(this), true);
      document.addEventListener('mousemove', this.mousemove.bind(this), true);
      document.addEventListener('mousedown', this.mousedown.bind(this), true);
      document.addEventListener('touchstart', this.touchstart.bind(this), true);
      document.addEventListener('touchmove', this.touchmove.bind(this), {
        passive: false,
      });
      document.addEventListener('touchend', this.touchend.bind(this), true);
      document.addEventListener(
        'touchcancel',
        this.touchcancel.bind(this),
        true
      );
      window.addEventListener('resize', this.stickToBorder.bind(this), true);
    },
    removeEventListeners() {
      document.removeEventListener('mouseup', this.mouseup.bind(this), true);
      document.removeEventListener(
        'mousemove',
        this.mousemove.bind(this),
        true
      );
      document.removeEventListener(
        'mousedown',
        this.mousedown.bind(this),
        true
      );
      document.removeEventListener(
        'touchstart',
        this.touchstart.bind(this),
        true
      );
      document.removeEventListener(
        'touchmove',
        this.touchmove.bind(this),
        true
      );
      document.removeEventListener('touchend', this.touchend.bind(this), true);
      document.removeEventListener(
        'touchcancel',
        this.touchcancel.bind(this),
        true
      );
      window.removeEventListener('resize', this.stickToBorder.bind(this), true);
    },
  },
  mounted() {
    this.addEventListeners();
    this.stickToBorder();
  },
  beforeDestroy() {
    this.removeEventListeners();
  },
});
</script>
