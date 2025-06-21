<template>
	<header class="header">
		<nav class="container-1440 header__nav">
			<label class="header__hamburger">
				<input type="checkbox" class="hamburger-input" />
			</label>
			<div class="header__links">
				<NuxtLink to="/">Home</NuxtLink>
				<NuxtLink to="/portfolio">Projects</NuxtLink>
			</div>
		</nav>
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
.header__hamburger {
	display: none;
	@include media(640px) {
		display: flex;
	}
}
.header__links {
	display: flex;
	column-gap: var(--fs-primary);
	& > a {
		position: relative;
		display: inline-block;
		color: var(--light-blue);
		text-decoration: none;
		&::after {
			content: '';
			position: absolute;
			width: 0%;
			height: 2px;
			left: 50%;
			bottom: 0;
			background-color: currentColor;
			transition: all 0.3s ease;
			transform: translateX(-50%);
		}
		&:hover::after {
			width: 100%;
		}
	}
}
</style>
