export function useWebSocket(url: string) {
	const socket = ref<WebSocket | null>(null);
	const isConnected = ref(false);
	const messages = ref<readonly string[]>([]);
	const error = ref<Event | null>(null);

	const connect = () => {
		socket.value = new WebSocket(url);

		socket.value.onopen = () => {
			isConnected.value = true;
			console.log('✅ WebSocket connected');
		};

		socket.value.onmessage = (event) => {
			messages.value = [...messages.value, event.data];
		};

		socket.value.onerror = (e) => {
			error.value = e;
			console.error('❌ WebSocket error', e);
		};

		socket.value.onclose = () => {
			isConnected.value = false;
			console.log('🔌 WebSocket disconnected');
		};
	};

	const sendMessage = (msg: string) => {
		if (socket.value && isConnected.value) {
			socket.value.send(msg);
		}
	};

	const disconnect = () => {
		socket.value?.close();
	};

	onUnmounted(() => {
		disconnect();
	});

	return {
		connect,
		sendMessage,
		disconnect,
		messages,
		isConnected,
		error,
	};
}
