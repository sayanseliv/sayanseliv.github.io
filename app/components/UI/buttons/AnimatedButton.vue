<template>
  <button class="animated-btn" type="button">
    <div class="animated-btn__text" :data-text="text">
      <span>{{ text }}</span>
    </div>
  </button>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
});
// <AnimatedButton text="Animated Button" />
</script>

<style scoped lang="scss">
.animated-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  border: 1px solid var(--color-accent);
  background-color: transparent;
  color: var(--color-primary);
  font-size: 17px;
  font-weight: 500;
  line-height: 100%;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;

  &:hover {
    border-color: var(--color-accent-dark);
  }
}

.animated-btn__text {
  position: relative;
  overflow: hidden;

  &::after {
    content: attr(data-text);
    position: absolute;
    top: 50%;
    left: 50%;
    width: max-content;
    transform: translate3d(-50%, 50%, 0);
    transform-style: preserve-3d;
    transition: transform 0.3s ease;
  }

  > span {
    display: block;
    transform: translate3d(0, 0, 0);
    transition: transform 0.3s ease;
  }

  .animated-btn:hover &::after {
    transform: translate3d(-50%, -54%, 0);
  }

  .animated-btn:hover > & > span {
    transform: translate3d(0, -100%, 0);
  }
}
</style>
