import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/shared/lib/debounce";
import { searchFontsAction } from "../api";

const SEARCH_DELAY_MS = 250;

export function useFontSearch(query: string, enabled: boolean) {
	const debouncedQuery = useDebounce(query, SEARCH_DELAY_MS);

	return useQuery({
		queryKey: ["fonts", "search", debouncedQuery],
		queryFn: () => searchFontsAction(debouncedQuery),
		placeholderData: keepPreviousData,
		staleTime: Number.POSITIVE_INFINITY,
		enabled,
	});
}
