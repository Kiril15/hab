import { useTranslations } from "next-intl";

export function useErrorMessage() {
	const t = useTranslations("GenerateProject.errors");

	return (key?: string) => (key ? (t.has(key) ? t(key) : key) : undefined);
}
