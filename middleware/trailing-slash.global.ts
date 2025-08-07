export default defineNuxtRouteMiddleware((to) => {
	if (to.path === '/') {
		return;
	}

	if (to.path.endsWith('/')) {
		const pathWithoutSlash = to.path.slice(0, -1);

		return navigateTo(
			{
				path: pathWithoutSlash,
				query: to.query,
				hash: to.hash,
			},
			{
				redirectCode: 301,
			}
		);
	}
});
