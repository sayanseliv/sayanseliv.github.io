<template>
  <button class="btn matrix" :class="variantClass">
    <span>{{ text }}</span>
    <div class="code-rain" />
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    required: true,
  },
});
const variantClass = computed(() => `matrix--${props.variant}`);
// <AnimatedMatrix text="Blue Matrix" variant="blue" />
// <AnimatedMatrix text="Red Matrix" variant="red" />
</script>

<style scoped lang="scss">
.btn {
  position: relative;
  padding: 1.2rem 3rem;
  font-size: 1.1rem;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s ease;
}

.matrix {
  background: #000;
  color: white;
}
.matrix--red {
  border: 2px solid var(--color-accent-dark);
}
.matrix--blue {
  border: 2px solid var(--color-primary);
}
.code-rain {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: 0.3s;
}
.matrix--blue .code-rain {
  background: linear-gradient(
    180deg,
    rgba(92, 120, 247, 0) 0%,
    rgba(92, 120, 247, 0.2) 50%,
    rgba(92, 120, 247, 0) 100%
  );
}
.matrix--red .code-rain {
  background: linear-gradient(
    180deg,
    rgba(240, 153, 176, 0) 0%,
    rgba(240, 153, 176, 0.2) 50%,
    rgba(240, 153, 176, 0) 100%
  );
}
.matrix:hover .code-rain {
  opacity: 1;
  animation: rain 1s linear infinite;
}

@keyframes rain {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>
