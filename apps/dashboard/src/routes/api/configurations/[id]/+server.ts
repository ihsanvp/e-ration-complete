import { Configuration, getConfigurationRepository } from '@e-ration/database';
import { error, json } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z.object({
	id: z.string(),
	value: z.boolean()
});

/** @type {import("./$types").RequestHandler} */
export async function POST({ params, request }) {
	const repo = getConfigurationRepository();
	const body = await request.json();
	const data = schema.parse(body);
	let config = await repo.findById(params.id);
	if (config) {
		config.value = data.value;
		await repo.update(config);
	} else {
		config = Configuration.fromJson(data);
		await repo.create(config);
	}
	return json(config);
}
