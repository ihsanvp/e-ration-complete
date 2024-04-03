import { Configuration, type IConfiguration } from '@e-ration/database';
import { error } from '@sveltejs/kit';

/** @type {import("./$types").PageLoad} */
export async function load({ fetch }) {
	const response = await fetch('/api/configurations');
	if (!response.ok) {
		return error(400);
	}
	const configs = (await response.json()).data as IConfiguration[];
	const monthlyBooking =
		configs.find((config) => config.id == 'monthly_booking') ??
		Configuration.fromJson({ id: 'monthly_booking', value: false });
	return {
		title: 'Settings',
		showBackButton: true,
		monthlyBooking: monthlyBooking
	};
}
