import type { ZodTypeAny, z } from "zod";

export type FormErrors<T extends ZodTypeAny> =
	z.inferFlattenedErrors<T>["fieldErrors"];
