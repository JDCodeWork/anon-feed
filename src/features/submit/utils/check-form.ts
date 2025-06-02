import { ZodError, type ZodTypeAny } from "zod";

interface SuccessReturnType<T> {
	success: true;
	data: T;
}

interface ErrorReturnType {
	success: false;
	errors: ReturnType<ZodError<unknown>["flatten"]>["fieldErrors"];
	message: string;
}

export const checkForm = <T extends ZodTypeAny>(
	form: FormData,
	schema: T,
): SuccessReturnType<T["_output"]> | ErrorReturnType => {
	const rawData = Object.fromEntries(form.entries()) as Record<string, string>;
	const parsedData = schema.safeParse(rawData);

	if (parsedData.success) {
		return {
			success: true,
			data: parsedData.data,
		};
	}

	const fieldErrors = parsedData.error.flatten().fieldErrors;

	return {
		success: false,
		errors: fieldErrors,
		message: "Please fix the errors in the form.",
	};
};
