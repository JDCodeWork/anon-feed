export type ActionReturns<T, E = any> = Promise<{
	ok: boolean;
	data?: T;
	error?: E;
}>;
