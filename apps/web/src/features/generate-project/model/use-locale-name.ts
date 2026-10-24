import { useLocale } from "next-intl";
import { useMemo } from "react";

export function useLocaleName() {
	const uiLocale = useLocale();
	const displayNames = useMemo(
		() => new Intl.DisplayNames([uiLocale], { type: "language" }),
		[uiLocale],
	);

	return (locale: string) => {
		try {
			return displayNames.of(locale) ?? locale;
		} catch {
			return locale;
		}
	};
}
