/** @type {import("./$types").RequestHandler} */

import {
	Booking,
	Booking2,
	getBooking2Repository,
	getBookingRepository,
	getCategoryRepository,
	getUserRepository
} from '@e-ration/database';
import { error, json } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z.object({
	uid: z.string(),
	category: z.string(),
	items: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			unit: z.string(),
			type: z.enum(['solid', 'liquid'] as const),
			quantity: z.number()
		})
	)
});

export async function POST({ request }) {
	const body = await request.json();
	const data = schema.parse(body);
	const booking = await getBookingRepository().createFromData(data);
	if (!booking) {
		return error(400, 'Invalid data');
	}
	const booking2 = Booking2.fromJson({
		id: booking.id,
		items: data.items.map((item) => ({
			name: item.name,
			ltr: item.type == 'liquid' ? item.quantity : undefined,
			quantity: item.type == 'solid' ? item.quantity : undefined
		}))
	});
	await getBooking2Repository().create(booking2);
	return json(booking);
}
