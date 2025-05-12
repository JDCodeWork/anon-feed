import { useState } from "react";
import { defaultTabFormInputs } from "../constants/tab-form";
import type { ProjectFormInputs as InputType } from "../interfaces/project-feed-info";

type RegisterOptions = {
	role: "input" | "select" | "check";
};
const defaultRegisterOptions: RegisterOptions = { role: "input" };

interface Props {
	initialValues?: InputType;
	onSubmit: (data: InputType) => void;
}
export const useForm = ({ initialValues, onSubmit }: Props) => {
	const [formValues, setFormValues] = useState<InputType>(
		initialValues || defaultTabFormInputs,
	);

	const onChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const register = <K extends keyof InputType>(
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
				value: formValues[name],
				onValueChange: (v: string) => setFormValue(name, v as InputType[K]),
			};
	};

	const setFormValue = <K extends keyof InputType>(
		key: K,
		value: InputType[K],
	) => {
		setFormValues((prev) => ({ ...prev, [key]: value }));
	};

	return {
		register,
		setFormValue,
		formValues,
		handleSubmit: () => onSubmit(formValues),
	};
};
