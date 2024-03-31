export interface ApiGetResult<T> {
	data: T[];
	cursor?: string;
}
