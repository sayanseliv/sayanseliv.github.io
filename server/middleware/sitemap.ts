export default defineEventHandler(async (event) => {
	if (
		getRouterParam(event, 'sitemap') === 'sitemap.xml' ||
		event.node.req.url === '/sitemap.xml'
	) {
		setHeader(event, 'Content-Type', 'application/xml; charset=utf-8');
		setHeader(event, 'Cache-Control', 'public, max-age=3600');
	}
});
