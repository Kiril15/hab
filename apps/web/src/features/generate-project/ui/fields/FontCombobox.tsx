"use client";

import type { FontOption } from "@repo/fonts";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Combobox } from "@/shared/ui/combobox";
import { useFontSearch } from "../../model";

interface FontComboboxProps {
	id: string;
	value: string;
	onSelect: (option: FontOption) => void;
}

export function FontCombobox({ id, value, onSelect }: FontComboboxProps) {
	const t = useTranslations("GenerateProject.fonts");
	const [query, setQuery] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const { data: fonts = [], isFetching } = useFontSearch(query, isOpen);

	const options = fonts.map(({ family }) => ({ value: family, label: family }));

	const handleSelect = (family: string) => {
		const font = fonts.find((item) => item.family === family);
		if (font) onSelect(font);
	};

	return (
		<Combobox
			id={id}
			value={value}
			options={options}
			onSelect={handleSelect}
			placeholder={t("searchPlaceholder")}
			emptyText={t("noResults")}
			isLoading={isFetching}
			onQueryChange={setQuery}
			onOpenChange={setIsOpen}
		/>
	);
}
