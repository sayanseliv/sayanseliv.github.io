<template>
	<header class="header">
		<nav class="container-1440 header__nav">Header</nav>
	</header>
</template>
<script>
export default {
	name: 'Header',
};
</script>

<style scoped lang="scss">
.header {
	position: fixed;
	z-index: 9999;
	height: 3rem;
	width: 100%;
	background-color: var(--bg-color);
}
.header__nav {
	height: inherit;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>
