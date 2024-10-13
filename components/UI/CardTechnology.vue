<template>
	<div class="technologies__item">
		<h6>{{ content.title }}</h6>
		<p>
			{{ content.text }}
		</p>
		<NuxtLink :to="content.link" external target="_blank">Learn more</NuxtLink>
	</div>
</template>

<script>
export default {
	name: 'CardTechnology',
	props: ['content'],
};
</script>

<style lang="scss" scoped>
.technologies__item {
	display: flex;
	flex-direction: column;
	padding: 1rem;
	border-radius: var(--border-radius);
	box-shadow: 0 3px 8px 0 rgba(15, 15, 20, 0.2);
	background: linear-gradient(159deg, #2d2d3a 0%, #2b2b35 100%);
	& > h6 {
		margin-bottom: 0.5rem;
		font-size: var(--fs-h6);
	}
	& > p {
		margin-bottom: 0.5rem;
		color: var(--tc-secondary);
	}
	& > a {
		position: relative;
		display: flex;
		align-items: center;
		width: fit-content;
		margin-top: auto;
		padding-right: 1.5rem;
		color: var(--light-blue);
		text-decoration: none;
		transition: text-shadow 0.3s;
		&:hover {
			text-shadow: 0 0 3px rgba(72, 171, 237, 0.4);
			&::after {
				right: 0rem;
			}
		}
		&::after {
			content: 'ᐳ';
			position: absolute;
			right: 0.5rem;
			font-size: var(--fs-caption);
			transition: right 0.3s;
		}
	}
}
</style>
