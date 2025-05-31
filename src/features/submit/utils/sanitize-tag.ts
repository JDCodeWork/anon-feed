export const sanitizeTag = (tag: string): string => {
	const input = tag.trim().toLowerCase();

	let cleaned = input.replace(/[^a-zA-Z0-9.\-\s]/g, "");

	cleaned = cleaned.replace(/\s+/g, " ").trim();
	if (!cleaned.includes("-")) {
		cleaned = cleaned.replace(/^\w/, (c) => c.toUpperCase());
	}
	cleaned = cleaned.slice(0, 25); // Limit to 50 characters

	const words = cleaned.split(" ");
	return words.slice(0, 2).join(" ");
};
