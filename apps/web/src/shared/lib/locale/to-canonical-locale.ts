export function toCanonicalLocale(value: string): string | undefined {
	try {
		return Intl.getCanonicalLocales(value.trim())[0];
	} catch {
		return undefined;
	}
}
