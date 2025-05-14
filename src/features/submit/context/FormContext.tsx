import { type PropsWithChildren, createContext, useContext } from "react";
import { useForm } from "../hooks/useForm";

import type { IProject } from "@features/projects";
import type { z } from "zod";

interface FormContextType extends ReturnType<typeof useForm> {}

const FormContext = createContext<FormContextType | null>(null);

export const useFormContext = (): FormContextType => {
	const context = useContext(FormContext);

	if (!context) {
		throw new Error("useFormContext debe usarse dentro de un <FormProvider>");
	}

	return context;
};

interface FormProviderProps {
	initialData?: IProject;
	onSubmit: (data: IProject) => void;
	onError: () => void;
	validations?: z.ZodType<IProject>;
}
export const FormProvider = ({
	children,
	initialData,
	onSubmit,
	onError,
	validations,
}: PropsWithChildren & FormProviderProps) => {
	const value = useForm({
		initialValues: initialData,
		onSubmit,
		onError,
		validations,
	});

	return <FormContext.Provider value={value}> {children}</FormContext.Provider>;
};
