<template>
	<header class="header">
		<nav class="container-1440 header__nav">
			<label class="header__hamburger">
				<span class="header__sr-only">Toggle navigation menu</span>
				<input
					id="checkboxBurger"
					v-model="checkboxBurger"
					type="checkbox"
					class="hamburger-input"
					aria-label="Toggle navigation menu" />
			</label>
			<div class="header__links">
				<NuxtLink to="/">Home</NuxtLink>
				<NuxtLink to="/portfolio">Portfolio</NuxtLink>
				<NuxtLink to="/features" :class="{ active: route.path.startsWith('/features') }">
					Features
				</NuxtLink>
				<div class="header__contact">
					<p>Contact:</p>
					<NuxtLink to="mailto:sayanseliv@gmail.com">sayanseliv@gmail.com</NuxtLink>
				</div>
			</div>
			<div class="header__overlay" @click="toggleCheckbox(false)" />
		</nav>
	</header>
</template>
<script setup lang="ts">
defineOptions({
	name: 'AppHeader',
});
const route = useRoute();
const checkboxBurger = ref(false);
const toggleCheckbox = (isValue: boolean) => {
	checkboxBurger.value = isValue;
};
</script>

<style scoped lang="scss">
.header {
	position: fixed;
	z-index: 100;
	height: 3rem;
	width: 100%;
	background-color: var(--bg-color);
}
.header__nav {
	position: relative;
	height: inherit;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.header__hamburger {
	position: relative;
	display: none;
	width: 28px;
	height: 18px;
	cursor: pointer;
	@include media(992px) {
		display: flex;
		margin-left: auto;
	}
	& .hamburger-input {
		top: 50%;
		transform: translateY(-50%);
		appearance: none;
		outline: none;
		pointer-events: none;
	}
	& .hamburger-input,
	&::before,
	&::after {
		content: '';
		position: absolute;
		left: 0;
		width: 100%;
		height: 2px;
		border-radius: 5px;
		background-color: var(--white);
		transition: transform 200ms ease-in-out, top 200ms ease-in-out, opacity 200ms ease-in-out;
		transform-origin: center;
	}
	&::before {
		top: 0;
	}
	&::after {
		bottom: 0;
	}

	&:has(.hamburger-input:checked)::before {
		transform: rotate(45deg);
		top: 50%;
	}
	&:has(.hamburger-input:checked)::after {
		transform: rotate(-45deg);
		bottom: auto;
		top: 50%;
	}
	& .hamburger-input:checked {
		opacity: 0;
		transform: translateY(-50%) scaleX(0);
	}
}
.header__sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}
.header__links {
	display: flex;
	width: 100%;
	column-gap: var(--fs-primary);
	@include media(992px) {
		position: absolute;
		top: 100%;
		left: auto;
		right: -100%;
		height: calc(100dvh - 3rem);
		min-width: 10rem;
		width: fit-content;
		padding: 1rem;
		flex-direction: column;
		row-gap: 1rem;
		background-color: var(--bg-color);
		transition: right 200ms ease-in-out;
	}
	& > a,
	& > .header__contact > a {
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
	& .router-link-exact-active::after,
	.active::after {
		width: 100%;
	}
	& .header__contact {
		display: flex;
		align-items: center;
		margin-left: auto;
		column-gap: 0.5rem;
		@include media(992px) {
			flex-direction: column;
			align-items: flex-start;
			margin-left: 0;
			padding-top: 0.5rem;
			border-top: 1px solid var(--grey-hr);
			row-gap: 0.5rem;
		}
	}
}
.header__overlay {
	display: none;
	position: absolute;
	z-index: -1;
	top: 3rem;
	right: -100vw;
	height: calc(100dvh - 3rem);
	width: 100vw;
	background: rgba(17, 25, 39, 0.2);
	backdrop-filter: blur(3px);
	opacity: 0;
	transition: opacity 0.3s ease;
	@include media(992px) {
		display: flex;
	}
}
.header__hamburger:has(> .hamburger-input:checked) {
	& + .header__links {
		@include media(992px) {
			right: 0;
		}
		& + .header__overlay {
			@include media(992px) {
				right: 0;
				opacity: 1;
			}
		}
	}
}
</style>
