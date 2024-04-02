import type { CategoryItemJson, IUser } from '@e-ration/database';

interface Data {
	uid: string;
	category: string;
	items: CategoryItemJson[];
}

export async function createBooking(data: Data): Promise<string> {
	const response = await fetch('/api/bookings', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	if (!response.ok) {
		throw new Error(await response.text());
	}
	const id = (await response.json()).id;
	return id;
}
