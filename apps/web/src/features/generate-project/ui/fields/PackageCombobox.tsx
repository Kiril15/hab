"use client";

import type { PackageSearchResult } from "@repo/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Combobox } from "@/shared/ui/combobox";
import { MIN_PACKAGE_QUERY_LENGTH } from "../../config";
import { usePackageSearch } from "../../model";

interface PackageComboboxProps {
	id: string;
	value: string;
	isInvalid: boolean;
	onSelect: (pkg: PackageSearchResult) => void;
}

export function PackageCombobox({ id, value, isInvalid, onSelect }: PackageComboboxProps) {
	const t = useTranslations("GenerateProject.dependencies");
	const [query, setQuery] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const { data: packages = [], isFetching } = usePackageSearch(query, isOpen);

	const isQueryTooShort = query.trim().length < MIN_PACKAGE_QUERY_LENGTH;
	const options = isQueryTooShort
		? []
		: packages.map(({ name, version, description }) => ({
				value: name,
				label: name,
				description: description ? `${version} · ${description}` : version,
			}));

	const handleSelect = (name: string) => {
		const pkg = packages.find((item) => item.name === name);
		if (pkg) onSelect(pkg);
	};

	return (
		<Combobox
			id={id}
			value={value}
			options={options}
			onSelect={handleSelect}
			placeholder={t("searchPlaceholder")}
			emptyText={isQueryTooShort ? t("typeMore") : t("noResults")}
			isLoading={isFetching}
			isInvalid={isInvalid}
			aria-label={t("name")}
			onQueryChange={setQuery}
			onOpenChange={setIsOpen}
		/>
	);
}
