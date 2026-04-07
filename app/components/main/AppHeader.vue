<template>
	<header class="header">
		<nav class="container header__nav">
			<button
				class="header__hamburger"
				type="button"
				aria-label="Toggle navigation menu"
				:aria-expanded="checkboxBurger"
				@click="toggleCheckbox(!checkboxBurger)">
				<span class="hamburger-line" />
				<span class="hamburger-line" />
				<span class="hamburger-line" />
			</button>
			<ul class="header__links" :class="{ 'header__links--open': checkboxBurger }">
				<li>
					<NuxtLink to="/">Home</NuxtLink>
				</li>
				<li>
					<NuxtLink to="/portfolio">Portfolio</NuxtLink>
				</li>
				<li>
					<NuxtLink
						to="/features"
						:class="{ active: route.path.startsWith('/features') }">
						Features
					</NuxtLink>
				</li>
				<li>
					<address class="header__contact">
						<span>Contact:</span>
						<NuxtLink to="mailto:sayanseliv@gmail.com" aria-label="Email Lang Eugen">
							sayanseliv@gmail.com
							<span class="sr-only">(email address)</span>
						</NuxtLink>
					</address>
				</li>
			</ul>
			<div
				class="header__overlay"
				:class="{ 'header__overlay--visible': checkboxBurger }"
				aria-hidden="true"
				@click="toggleCheckbox(false)" />
		</nav>
	</header>
</template>
<script setup lang="ts">
defineOptions({
	name: 'AppHeader',
});

const route = useRoute();
const checkboxBurger = ref<boolean>(false);

watch(
	() => route.path,
	() => {
		checkboxBurger.value = false;
	}
);

const toggleCheckbox = (isValue: boolean) => {
	checkboxBurger.value = isValue;
};

// Закриття меню при натисканні Escape
const handleKeydown = (event: KeyboardEvent) => {
	if (event.key === 'Escape' && checkboxBurger.value) {
		checkboxBurger.value = false;
	}
};

onMounted(() => {
	document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
	document.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped lang="scss">
.header {
	position: fixed;
	z-index: 100;
	height: 3rem;
	width: 100%;
	background-color: var(--gray-500);
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
	width: 44px;
	height: 44px;
	padding: 8px;
	cursor: pointer;
	border: none;
	background: transparent;
	border-radius: 0.5rem;
	transition: background-color 0.3s;

	@include media(768px) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 4px;
		margin-left: auto;
	}

	&:hover {
		background-color: var(--gray-800);
	}

	&:focus {
		outline: 2px solid var(--blue-300);
	}
}

.hamburger-line {
	display: block;
	width: 28px;
	height: 2px;
	background-color: var(--white);
	border-radius: 5px;
	transition: transform 200ms ease-in-out, opacity 200ms ease-in-out;
	transform-origin: center;

	.header__hamburger[aria-expanded='true'] & {
		&:nth-child(1) {
			transform: translateY(6px) rotate(45deg);
		}

		&:nth-child(2) {
			opacity: 0;
		}

		&:nth-child(3) {
			transform: translateY(-6px) rotate(-45deg);
		}
	}
}

.header__links {
	display: flex;
	width: 100%;
	column-gap: var(--fs-primary);

	@include media(768px) {
		position: absolute;
		top: 100%;
		right: -100%;
		height: calc(100dvh - 3rem);
		min-width: 10rem;
		width: fit-content;
		padding: 1rem;
		flex-direction: column;
		row-gap: 1rem;
		border-top: 1px solid var(--gray-100);
		background-color: var(--gray-500);
		transition: right 200ms ease-in-out;
	}

	&--open {
		@include media(768px) {
			right: 0;
		}
	}

	& > li > a,
	& > li > .header__contact > a {
		position: relative;
		display: inline-block;
		color: var(--blue-300);
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

		&:hover::after,
		&:focus::after {
			width: 100%;
		}
	}

	& li .router-link-exact-active::after,
	& li .active::after {
		width: 100%;
	}

	& li:last-child {
		margin-left: auto;
	}

	& li > .header__contact {
		display: flex;
		align-items: center;
		column-gap: 0.5rem;
		font-style: normal;

		@include media(768px) {
			flex-direction: column;
			align-items: flex-start;
			margin-left: 0;
			padding-top: 0.5rem;
			border-top: 1px solid var(--gray-100);
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
	transition: opacity 0.3s ease, right 0.3s ease;

	@include media(768px) {
		display: flex;
	}

	&--visible {
		@include media(768px) {
			right: 0;
			opacity: 1;
		}
	}
}
</style>
