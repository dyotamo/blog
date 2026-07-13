import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = await getCollection('articles');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => {
			const [lang, ...slugParts] = post.id.split('/');
			const slug = slugParts.join('/');
			return {
				...post.data,
				link: lang === 'en' ? `/articles/${slug}/` : `/pt/articles/${slug}/`,
			};
		}),
	});
}
