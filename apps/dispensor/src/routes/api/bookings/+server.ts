/** @type {import("./$types").RequestHandler} */

import {
	Booking,
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
	return json(booking);
}
