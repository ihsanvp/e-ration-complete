import { getConfigurationRepository } from '@e-ration/database';
import { json } from '@sveltejs/kit';

/** @type {import("./$types").RequestHandler} */
export async function GET() {
	const configs = await getConfigurationRepository().find();
	return json({
		data: configs.map((config) => config.toJson())
	});
}
