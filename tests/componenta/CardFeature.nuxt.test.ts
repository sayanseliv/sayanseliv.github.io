import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import CardFeature from '@/components/cards/CardFeature.vue';

describe('CardFeature', () => {
	const mockProps = {
		title: 'Test Title',
		description: 'Test description for the card component',
		tags: ['Vue', 'Nuxt', 'TypeScript'],
		image: '/test-image.jpg',
		link: 'https://en.wikipedia.org/wiki/HTML5',
	};

	it('renders correctly with all props', async () => {
		const wrapper = await mountSuspended(CardFeature, {
			props: mockProps,
		});

		// Check: component is mounted
		expect(wrapper.exists()).toBe(true);
	});

	it('displays the correct title', async () => {
		const wrapper = await mountSuspended(CardFeature, {
			props: mockProps,
		});

		const title = wrapper.find('h3');
		expect(title.exists()).toBe(true);
		expect(title.text()).toBe(mockProps.title);
	});

	it('displays the correct description', async () => {
		const wrapper = await mountSuspended(CardFeature, {
			props: mockProps,
		});

		const description = wrapper.find('p');
		expect(description.exists()).toBe(true);
		expect(description.text()).toBe(mockProps.description);
	});

	it('renders all tags correctly', async () => {
		const wrapper = await mountSuspended(CardFeature, {
			props: mockProps,
		});

		const tags = wrapper.findAll('.tag');
		expect(tags).toHaveLength(mockProps.tags.length);

		tags.forEach((tag, index) => {
			expect(tag.text()).toBe(mockProps.tags[index]);
		});
	});

	it('creates correct NuxtLink with proper "to" attribute', async () => {
		const wrapper = await mountSuspended(CardFeature, {
			props: mockProps,
		});

		const link = wrapper.find('a');
		expect(link.exists()).toBe(true);
		expect(link.attributes('href')).toBe(mockProps.link);
	});

	it('applies correct background image style', async () => {
		const wrapper = await mountSuspended(CardFeature, {
			props: mockProps,
		});

		const card = wrapper.find('.card');
		const style = card.attributes('style');
		expect(style).toContain(`--bg-img: url('${mockProps.image}')`);
	});

	it('has correct CSS classes', async () => {
		const wrapper = await mountSuspended(CardFeature, {
			props: mockProps,
		});

		expect(wrapper.find('.card').exists()).toBe(true);
		expect(wrapper.find('.tags').exists()).toBe(true);
		expect(wrapper.findAll('.tag')).toHaveLength(mockProps.tags.length);
	});

	it('handles empty tags array', async () => {
		const propsWithoutTags = {
			...mockProps,
			tags: [],
		};

		const wrapper = await mountSuspended(CardFeature, {
			props: propsWithoutTags,
		});

		const tags = wrapper.findAll('.tag');
		expect(tags).toHaveLength(0);
	});

	it('works with different prop types', async () => {
		const differentProps = {
			title: 'Another Title',
			description: 'A completely different description with more text',
			tags: ['React', 'Next.js', 'JavaScript', 'CSS'],
			image: '/another-image.png',
			link: 'https://en.wikipedia.org/wiki/CSS',
		};

		const wrapper = await mountSuspended(CardFeature, {
			props: differentProps,
		});

		expect(wrapper.find('h3').text()).toBe(differentProps.title);
		expect(wrapper.find('p').text()).toBe(differentProps.description);
		expect(wrapper.findAll('.tag')).toHaveLength(differentProps.tags.length);
		expect(wrapper.find('a').attributes('href')).toBe(differentProps.link);
	});

	it('handles special characters in props', async () => {
		const specialProps = {
			title: 'Title with "quotes" & symbols',
			description: 'Description with <HTML> & special chars!',
			tags: ['Tag with spaces', 'Tag-with-dashes', 'Tag_with_underscores'],
			image: '/images/special-chars_image.jpg',
			link: 'https://en.wikipedia.org/wiki/HTML5',
		};

		const wrapper = await mountSuspended(CardFeature, {
			props: specialProps,
		});

		expect(wrapper.find('h3').text()).toBe(specialProps.title);
		expect(wrapper.find('p').text()).toBe(specialProps.description);

		const tags = wrapper.findAll('.tag');
		tags.forEach((tag, index) => {
			expect(tag.text()).toBe(specialProps.tags[index]);
		});
	});

	// Accessibility
	it('has proper semantic structure', async () => {
		const wrapper = await mountSuspended(CardFeature, {
			props: mockProps,
		});

		// Semantic
		expect(wrapper.find('h3').exists()).toBe(true);
		expect(wrapper.find('p').exists()).toBe(true);
		expect(wrapper.find('a').exists()).toBe(true);
	});
});
