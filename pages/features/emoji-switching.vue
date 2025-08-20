<template>
	<main class="emoji-switching">
		<div class="container">
			<EmojiSwitchingInterface />
		</div>
	</main>
</template>

<script setup lang="ts">
defineOptions({
	name: 'EmojiSwitching',
});
</script>

<style scoped lang="scss">
.emoji-switching {
	padding-top: 4rem;
	overflow: hidden;
}
</style>
