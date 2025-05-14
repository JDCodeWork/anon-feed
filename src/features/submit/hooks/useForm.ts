import type { IPartialProject, IProject } from "@features/projects";
import { useState } from "react";
import type { z } from "zod";
import { defaultFormValues } from "../constants/default-form-values.constant";

type RegisterOptions = {
	role: "input" | "select" | "check";
};
const defaultRegisterOptions: RegisterOptions = { role: "input" };

type FormErrorsType = Partial<Record<keyof IProject, string>>;

interface Props {
	initialValues?: IPartialProject;
	onSubmit: (data: IProject) => void;
	onError: () => void;
	validations?: z.ZodType<IProject>;
}

export const useForm = ({
	initialValues,
	onSubmit,
	onError,
	validations,
}: Props) => {
	const [formValues, setFormValues] = useState<IPartialProject>(
		initialValues || defaultFormValues,
	);

	const [formErrors, setFormErrors] = useState<FormErrorsType>({});

	const onChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		removeFormError(e.target.name as keyof FormErrorsType);
		setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const register = <K extends keyof IProject>(
		name: K,
		options: RegisterOptions = defaultRegisterOptions,
	) => {
		if (options.role == "input")
			return {
				name,
				value: formValues[name] ?? "",
				onChange,
			};

		if (options.role == "select")
			return {
				name,
				value: formValues[name],
				onValueChange: (v: string) => {
					setFormValue(name, v as IProject[K]);
					removeFormError(name);
				},
			};
	};

	const setFormValue = <K extends keyof IProject>(
		key: K,
		value: IProject[K] | undefined, // Permitimos undefined
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
			onError();
		}

		if (validationResult?.success) {
			onSubmit(validationResult.data);
		}
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
