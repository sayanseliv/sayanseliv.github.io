import CardPortfolio from '@/components/cards/CardPortfolio.vue';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
describe('CardPortfolio', () => {
	const mockProps = {
		id: 1,
		title: 'Test Title',
		description: 'Test description for the card component',
		logo: '/projects/xdock.webp',
		technology: 'Vue, Nuxt, TypeScript',
		link: 'https://zelh.com/',
	};
	it('renders correctly with all props', async () => {
		const wrapper = await mountSuspended(CardPortfolio, {
			props: { content: mockProps },
		});
		expect(wrapper.exists()).toBe(true);

		expect(wrapper.exists()).toBe(true);
		expect(wrapper.html()).toContain('Test Title');
		expect(wrapper.html()).toContain('Vue, Nuxt, TypeScript');
	});
});
