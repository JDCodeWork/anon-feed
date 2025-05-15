export const generatePagination = (current: number, total: number) => {
	if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

	const isTotalFar = total > current + 2;

	if (current <= 2) return [1, 2, 3, -1, total];

	if (total == 1) return [1];

	return isTotalFar
		? [1, -1, current - 1, current, current + 1, -1, total]
		: [1, -1, total - 2, total - 1, total];
};
