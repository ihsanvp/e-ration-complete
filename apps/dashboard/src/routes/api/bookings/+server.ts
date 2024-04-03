import { getPaginationLimit } from '$lib/utils/params';
import { getBookingRepository, type Booking } from '@e-ration/database';
import { json } from '@sveltejs/kit';

/** @type {import("./$types").RequestHandler} */
export async function GET({ url }) {
	let data: Booking[];
	let cursor: string | undefined;
	const limit = getPaginationLimit(url.searchParams);
	const repo = getBookingRepository();
	if (limit) {
		data = await repo.paginate({
			orderBy: 'created',
			limit: limit,
			cursor: url.searchParams.get('cursor')
		});
		cursor = data.length == limit ? data[data.length - 1].id : undefined;
	} else {
		data = await repo.orderByAscending('created').find();
	}
	return json({
		cursor: cursor,
		data: data.map((i) => i.toJson())
	});
}
