<template>
	<main class="main-websoсket">
		<section class="websocket-hero">
			<div class="container-1440">
				<div class="hero__wrapper">
					<h1 class="hero__title">
						<NuxtLink
							to="https://websocket.org/tools/websocket-echo-server/"
							external
							target="_blank">
							WebSocket Echo
						</NuxtLink>
					</h1>
					<div class="hero__actions">
						<input v-model="input" placeholder="Type a message" class="hero__input" />
						<button class="hero__btn" @click="send">Send</button>
					</div>
					<div class="hero__messages">
						<h2>Messages:</h2>
						<ul class="messages__list">
							<li v-for="(msg, index) in messages" :key="`meassage-${index}`">
								{{ msg }}
							</li>
						</ul>
					</div>
					<div v-if="error" class="hero__error">WebSocket error!</div>
				</div>
			</div>
		</section>
	</main>
</template>
<script lang="ts" setup>
defineOptions({
	name: 'PageWebsocket',
});

const input = ref('');
const { connect, sendMessage, messages, error } = useWebSocket('wss://echo.websocket.events');

onMounted(() => {
	connect();
});

const send = () => {
	if (input.value.trim()) {
		sendMessage(input.value);
		input.value = '';
	}
};
</script>
<style lang="scss" scoped>
.main-websoсket {
	padding-top: 4rem;
}
.hero__wrapper {
	display: flex;
	flex-direction: column;
	padding: 1rem;
	margin-inline: auto;
	background-color: var(--gray-900);
	border-radius: var(--border-radius);
	@include media(768px) {
		width: 100%;
		flex-direction: column;
	}
}
.hero__title {
	margin-bottom: 1rem;
	font-size: var(--fs-h1);
	& > a {
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
			transition: width 0.3s ease;
			transform: translateX(-50%);
		}
		&:hover::after {
			width: 100%;
		}
	}
	@include media(768px) {
		font-size: var(--fs-h2);
	}
}
.hero__actions {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}
.hero__input {
	width: 50%;
	padding: 0.5rem;
	margin-bottom: 1rem;
	border: 1px solid var(--white);
	border-radius: var(--border-radius);
	font-size: var(--fs-primary);
	transition: border-color 0.3s;
	&:hover {
		border-color: var(--blue-300);
	}
	&:focus {
		outline: none;
		border-color: var(--blue-300);
		background: linear-gradient(to top, var(--gray-900), var(--gray-600));
	}
	@include media(480px) {
		width: 100%;
	}
}
.hero__btn {
	margin-bottom: 1rem;
	padding: 0.5rem 1.5rem;
	border: 1px solid var(--white);
	border-radius: var(--border-radius);
	transition: background-color 0.3s, color 0.3s, border-color 0.3s;
	&:hover {
		color: var(--blue-300);
		border-color: var(--blue-300);
		background-color: var(--gray-900);
	}
}
.hero__messages {
	display: flex;
	flex-direction: column;
	row-gap: 1.2rem;
	margin-top: 1rem;
	font-size: var(--fs-h2);
}
.messages__list {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	padding: 0;
	margin: 0;
	font-size: var(--fs-primary);
	list-style: none;
	& > li {
		padding: 0.5rem;
		border-radius: var(--border-radius);
		background-color: var(--gray-500);
	}
}
.hero__error {
	margin-top: 1rem;
	color: var(--error);
}
</style>
