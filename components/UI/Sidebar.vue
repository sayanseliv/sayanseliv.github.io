<template>
	<aside class="aside">
		<figure class="aside__avatar">
			<img src="/cv_photo.jpeg" alt="Lang Eugen avatar" class="aside__image" />
			<figcaption class="aside__figcaption">
				Lang Eugen
				<p class="aside__position">Front-end developer</p>
			</figcaption>
		</figure>
		<section class="aside__scrollable">
			<ul class="aside__info">
				<li class="info__item">
					<h6>Residence:</h6>
					<span>Ukraine</span>
				</li>
				<li class="info__item">
					<h6>City:</h6>
					<span>Odesa</span>
				</li>
				<li class="info__item">
					<h6>Age:</h6>
					<span>{{ age }}</span>
				</li>
			</ul>
			<div>
				<CircleProgress
					:show-percent="true"
					:percent="50"
					:size="50"
					:borderBgWidth="5"
					:borderWidth="5"
					fill-color="#48abed"
					emptyColor="#191923" />
				<CircleProgress
					:show-percent="true"
					:percent="70"
					:size="50"
					:borderBgWidth="5"
					:borderWidth="5"
					fill-color="#48abed"
					emptyColor="#191923" />
			</div>
		</section>
	</aside>
</template>

<script>
export default {
	name: 'Sidebar',
	data() {
		return {
			birthDate: '1985-03-27',
		};
	},
	computed: {
		age() {
			const currentDate = new Date();
			const birthDateTime = new Date(this.birthDate);

			let age = currentDate.getFullYear() - birthDateTime.getFullYear();

			if (
				currentDate.getMonth() < birthDateTime.getMonth() ||
				(currentDate.getMonth() === birthDateTime.getMonth() &&
					currentDate.getDate() < birthDateTime.getDate())
			) {
				age--;
			}

			return age;
		},
	},
};
</script>

<style lang="scss" scoped>
.aside {
	position: fixed;
	width: 18.125rem;
	height: calc(100svh - 11rem);
	padding: 13.05rem 0.9375rem 2rem;
	background-color: var(--bg-secondary-color);
	border-radius: var(--border-radius);
}
.aside__avatar {
	position: absolute;
	inset: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	max-height: max-content;
	padding-block: 0.9375rem;
	background: linear-gradient(159deg, rgba(37, 37, 50, 0.98) 0%, rgba(35, 35, 45, 0.98) 100%);
}
.aside__image {
	width: 100%;
	height: 100%;
	max-width: 8rem;
	max-height: 8rem;
	margin-bottom: 0.5rem;
	object-fit: cover;
	border-radius: 50%;
}
.aside__position {
	margin-top: var(--insent-sm);
	color: var(--tc-secondary);
}
.aside__scrollable {
	padding: 0.9375rem;
}
.aside__info {
	padding-block: 0.9375rem;
	border-bottom: 1px solid var(--tc-secondary);
}
.info__item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: var(--fs-caption);
	&:not(:last-child) {
		margin-bottom: var(--insent-sm);
	}
	& > h6 {
		font-size: var(--fs-caption);
	}
	& > span {
		color: var(--tc-secondary);
	}
}
</style>
