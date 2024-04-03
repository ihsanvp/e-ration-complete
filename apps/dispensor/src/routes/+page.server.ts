import {
	getCategoryRepository,
	type CategoryJson,
	getBookingRepository,
	type CategoryItemJson,
	getConfigurationRepository
} from '@e-ration/database';
import { error } from '@sveltejs/kit';

/** @type {import("./$types").PageLoad} */
export async function load({ locals }) {
	const user = locals.user;
	if (!user) {
		return error(401);
	}
	if (!user.category) {
		return error(403);
	}
	const category = await getCategoryRepository().findById(user.category);
	if (!category) {
		return error(500, 'Invalid Category');
	}
	const serialized = (await getCategoryRepository().serialize(category)) as CategoryJson;
	let items = Array.isArray(serialized.items) ? serialized.items : [];
	const config = await getConfigurationRepository().findById('monthly_booking');
	if (items.length) {
		if (config && config.value) {
			const bookedItems = await getBookingRepository()
				.orderByAscending('created')
				.whereEqualTo((booking) => booking.user.id, user.id)
				.find();
			if (bookedItems && bookedItems.length) {
				const lastMonthBookings = bookedItems.filter((booking) => {
					const today = new Date();
					return (
						booking.created.getFullYear() == today.getFullYear() &&
						booking.created.getMonth() == today.getMonth()
					);
				});
				if (lastMonthBookings.length) {
					const bookedItems: CategoryItemJson[] = [];
					lastMonthBookings.forEach((booking) => bookedItems.push(...booking.items));
					items = items.filter((item) => bookedItems.findIndex((i) => i.id == item.id) == -1);
				}
			}
		}
	}

	return {
		category: serialized,
		items
	};
}
