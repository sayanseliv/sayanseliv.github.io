<template>
  <button
    type="button"
    class="relative group bg-primary px-8 [clip-path:polygon(0%_20%,10%_0%,100%_0%,100%_80%,90%_100%,0%_100%)] text-2xl hover:bg-(--color-primary-dark) overflow-hidden transition-colors">
    <p class="relative text-white flex justify-center gap-0.5">
      <span
        v-for="(char, i) in letters"
        :key="i"
        class="relative inline-block overflow-hidden"
        :style="{ '--i': i }">
        <span
          class="top inline-block transition-transform duration-300 ease-out delay-[calc(var(--i)*30ms)]">
          {{ char }}
        </span>
        <span
          class="bottom inline-block absolute left-0 top-full transition-transform duration-300 ease-out delay-[calc(var(--i)*30ms)]">
          {{ char }}
        </span>
      </span>
    </p>
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
// <AnimatedWaveClipButton text="Animated Wave Clip Button" />
</script>

<style scoped>
button:hover .top {
  transform: translateY(-100%);
}
button:hover .bottom {
  transform: translateY(-100%);
}
</style>
