import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/shared/lib/debounce";
import { searchPackagesAction } from "../api";
import { MIN_PACKAGE_QUERY_LENGTH } from "../config";

export function usePackageSearch(query: string, isOpen: boolean) {
	const debouncedQuery = useDebounce(query.trim(), 300);

	return useQuery({
		queryKey: ["packages", "search", debouncedQuery],
		queryFn: () => searchPackagesAction(debouncedQuery),
		placeholderData: keepPreviousData,
		staleTime: 5 * 60 * 1000,
		enabled: isOpen && debouncedQuery.length >= MIN_PACKAGE_QUERY_LENGTH,
	});
}
