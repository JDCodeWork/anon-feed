import { type PropsWithChildren, createContext, useContext } from "react";
import { useForm } from "../hooks/useForm";
import type { ProjectFormInputs as InputsType } from "../interfaces/project-feed-info";

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
	initialData?: InputsType;
	onSubmit: (data: InputsType) => void;
}
export const FormProvider = ({
	children,
	initialData,
	onSubmit,
}: PropsWithChildren & FormProviderProps) => {
	const value = useForm({ initialValues: initialData, onSubmit });

	return <FormContext.Provider value={value}> {children}</FormContext.Provider>;
};
