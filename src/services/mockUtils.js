export function withMockDelay(data) {
	return new Promise((resolve) => {
		setTimeout(() => resolve(data), 500);
	});
}
