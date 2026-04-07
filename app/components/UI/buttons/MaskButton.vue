<template>
  <div
    class="mask-button"
    :style="{
      '--button-color': color,
      '--text-color': textColor,
    }">
    <span class="mas">{{ label }}</span>
    <button
      type="button"
      :class="['variant-' + variant, { hover }]"
      @mouseenter="hover = true"
      @mouseleave="hover = false">
      {{ label }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  variant: {
    type: String,
    default: 'mask1', // mask1 | mask2 | mask3
  },
  label: {
    type: String,
    default: 'BUTTON',
  },
  color: {
    type: String,
    default: '#000',
  },
  textColor: {
    type: String,
    default: '#fff',
  },
});

const hover = ref(false);

// <MaskButton variant="mask1" label="Mask 1" color="#000" text-color="#fff" />
// <MaskButton variant="mask2" label="Mask 2" color="#2b6df6" text-color="#fff" />
// <MaskButton variant="mask3" label="Mask 3" color="#f04e4e" text-color="#fff" />
</script>

<style scoped lang="scss">
.mask-button {
  position: relative;
  width: 120px;
  height: 50px;
  margin: 20px auto;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid var(--button-color);
  text-align: center;
  font-family: 'Lato', sans-serif;

  button {
    width: 101%;
    height: 100%;
    font-size: 12px;
    font-weight: bold;
    color: var(--text-color);
    background: var(--button-color);
    cursor: pointer;
    border: none;
    transition: 0.3s;
  }

  .mas {
    position: absolute;
    color: var(--button-color);
    text-align: center;
    width: 100%;
    top: 17px;
    font-size: 12px;
    font-weight: bold;
    pointer-events: none;
  }
}

/* === VARIANT 1 === */
.variant-mask1 {
  -webkit-mask: url('https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/nature-sprite.png');
  mask: url('https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/nature-sprite.png');
  -webkit-mask-size: 2300% 100%;
  mask-size: 2300% 100%;
  -webkit-animation: mask-anim-1-rev 0.7s steps(22) forwards;
  animation: mask-anim-1-rev 0.7s steps(22) forwards;
}

.variant-mask1.hover {
  animation: mask-anim-1 0.7s steps(22) forwards;
}

/* === VARIANT 2 === */
.variant-mask2 {
  -webkit-mask: url('https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/urban-sprite.png');
  mask: url('https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/urban-sprite.png');
  -webkit-mask-size: 3000% 100%;
  mask-size: 3000% 100%;
  -webkit-animation: mask-anim-2-rev 0.7s steps(29) forwards;
  animation: mask-anim-2-rev 0.7s steps(29) forwards;
}

.variant-mask2.hover {
  animation: mask-anim-2 0.7s steps(29) forwards;
}

/* === VARIANT 3 === */
.variant-mask3 {
  -webkit-mask: url('https://raw.githubusercontent.com/pizza3/asset/master/natureSmaller.png');
  mask: url('https://raw.githubusercontent.com/pizza3/asset/master/natureSmaller.png');
  -webkit-mask-size: 7100% 100%;
  mask-size: 7100% 100%;
  -webkit-animation: mask-anim-3-rev 0.7s steps(70) forwards;
  animation: mask-anim-3-rev 0.7s steps(70) forwards;
}

.variant-mask3.hover {
  animation: mask-anim-3 0.7s steps(70) forwards;
}

/* === Animations === */
@keyframes mask-anim-1 {
  from {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
  to {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
}
@keyframes mask-anim-1-rev {
  from {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
  to {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
}

@keyframes mask-anim-2 {
  from {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
  to {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
}
@keyframes mask-anim-2-rev {
  from {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
  to {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
}

@keyframes mask-anim-3 {
  from {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
  to {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
}
@keyframes mask-anim-3-rev {
  from {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
  to {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
}
</style>
