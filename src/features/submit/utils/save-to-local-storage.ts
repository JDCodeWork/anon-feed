/**
 * Saves data to localStorage under the specified key, merging it with any existing data.
 *
 * If data already exists under the given key, this function will shallow-merge the new data
 * with the existing data and save the result to localStorage.
 * If no data exists, it will simply store the new data.
 *
 * @param key - The key under which the data will be stored in localStorage.
 * @param data - The data to save. Must be a JSON-serializable object.
 * @returns An object with the property `success` set to true if the operation was successful,
 *          or `success` set to false and an `error` property if an error occurred.
 *
 * @remarks
 * This function handles errors safely and returns information about the result.
 */
export const saveToLocalStorage = (
	key: string,
	data: any,
): { success: boolean; error?: string } => {
	try {
		const existingData = localStorage.getItem(key);
		const parsedData = existingData ? JSON.parse(existingData) : {};

		// Merge new data with existing data
		const updatedData = { ...parsedData, ...data };

		localStorage.setItem(key, JSON.stringify(updatedData));
		return {
			success: true,
		};
	} catch (error) {
		return {
			success: false,
			error: "Error saving to localStorage",
		};
	}
};
