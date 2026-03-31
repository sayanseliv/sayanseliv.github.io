<template>
  <button class="wave-btn" type="button">
    <span
      v-for="(char, index) in letters"
      :key="index"
      class="wave-btn__letter"
      :style="{ '--i': index }">
      <span class="top">{{ char }}</span>
      <span class="bottom">{{ char }}</span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});

const letters = computed(() => props.text.split(''));
// <AnimatedWaveButton text="Animated Wave Button" />
</script>

<style scoped lang="scss">
.wave-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 36px;

  background-color: transparent;
  color: var(--color-accent-dark);
  font-size: 17px;
  font-weight: 500;
  line-height: 100%;
  cursor: pointer;
  border: 1px solid var(--color-primary-dark);
  overflow: hidden;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;

  &:hover {
    border-color: var(--color-primary);
  }
}

.wave-btn__letter {
  position: relative;
  display: inline-block;
  overflow: hidden;
  margin: 0 1px;

  .top,
  .bottom {
    display: block;
    transition: transform 0.4s ease;
    transition-delay: calc(var(--i) * 0.03s);
  }

  .bottom {
    position: absolute;
    left: 0;
    top: 100%;
  }

  .wave-btn:hover & .top {
    transform: translateY(-100%);
  }

  .wave-btn:hover & .bottom {
    transform: translateY(-100%);
  }
}
</style>
