import { error } from '@sveltejs/kit';

const BACK_PAGES = ['/app/items/create', '/app/settings'];
const TITLES_MAP = new Map(
	Object.entries({
		'/app/overview': 'Overview',

		'/app/items': 'Items',
		'/app/items/create': 'Create Item',

		'/app/bookings': 'Bookings',

		'/app/categories': 'Categories',
		'/app/categories/add': 'Add Category',

		'/app/users': 'Users',

		'/app/settings': 'Settings'
	})
);

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals, url }) {
	if (!locals.user) {
		return error(401, 'Unauthorized');
	}
	return {
		user: locals.user,
		hasBack: BACK_PAGES.includes(url.pathname) as boolean,
		title: (TITLES_MAP.get(url.pathname) as string) ?? ''
	};
}
