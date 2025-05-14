import { useState } from "react";
import { defaultTabFormInputs } from "../constants/tab-form";

import type { z } from "zod";
import { type ProjectFeedType as InputsType } from "../schemas/project-feed-schema";

type RegisterOptions = {
	role: "input" | "select" | "check";
};
const defaultRegisterOptions: RegisterOptions = { role: "input" };

type FormErrorsType = Partial<Record<keyof InputsType, string>>;

interface Props {
	initialValues?: InputsType;
	onSubmit: (data: InputsType) => void;
	validations?: z.ZodType<InputsType>;
}
export const useForm = ({ initialValues, onSubmit, validations }: Props) => {
	const [formValues, setFormValues] = useState<InputsType>(
		initialValues || defaultTabFormInputs,
	);

	const [formErrors, setFormErrors] = useState<FormErrorsType>({});

	const onChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		removeFormError(e.target.name as keyof FormErrorsType);
		setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const register = <K extends keyof InputsType>(
		name: K,
		options: RegisterOptions = defaultRegisterOptions,
	) => {
		if (options.role == "input")
			return {
				name,
				value: formValues[name],
				onChange,
			};

		if (options.role == "select")
			return {
				name,
				value: formValues[name],
				onValueChange: (v: string) => {
					setFormValue(name, v as InputsType[K]);
					removeFormError(name);
				},
			};
	};

	const setFormValue = <K extends keyof InputsType>(
		key: K,
		value: InputsType[K],
	) => {
		setFormValues((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = () => {
		const validationResult = validations?.safeParse(formValues);

		const errors: FormErrorsType = {};
		if (!validationResult?.success && validationResult?.error) {
			for (const issue of validationResult.error.issues) {
				errors[issue.path[0] as keyof FormErrorsType] = issue.message;
			}

			setFormErrors(errors);
		}

		validationResult?.data && onSubmit(validationResult.data);
	};

	const removeFormError = (key: keyof FormErrorsType) => {
		setFormErrors((prev) => ({ ...prev, [key]: undefined }));
	};

	return {
		register,
		setFormValue,
		formValues,
		formErrors,
		removeFormError,
		handleSubmit,
	};
};
