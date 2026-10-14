import { z } from "zod";

export function validateEnv<TSchema extends z.ZodType>(
	schema: TSchema,
	source: Record<string, string | undefined>,
): z.infer<TSchema> {
	const result = schema.safeParse(source);

	if (!result.success) {
		throw new Error(`Invalid environment variables:\n${z.prettifyError(result.error)}`);
	}

	return result.data;
}
