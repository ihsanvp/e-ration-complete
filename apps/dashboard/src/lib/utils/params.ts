export function getPaginationLimit(params: URLSearchParams): number {
	const limit = params.get('limit') ?? '1';
	return parseInt(limit);
}
