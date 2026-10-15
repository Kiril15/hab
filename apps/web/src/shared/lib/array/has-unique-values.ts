export const hasUniqueValues = (values: readonly unknown[]) =>
	new Set(values).size === values.length;
