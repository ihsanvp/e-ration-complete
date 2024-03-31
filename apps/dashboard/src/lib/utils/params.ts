export function getPaginationLimit(params: URLSearchParams): number | null {
	const limit = params.get('limit');
	if (!limit) {
		return null;
	}
	return parseInt(limit);
}
