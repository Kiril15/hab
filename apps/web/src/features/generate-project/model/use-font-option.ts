import { useQuery } from "@tanstack/react-query";
import { getFontOptionAction } from "../api";

export function useFontOption(family: string) {
	return useQuery({
		queryKey: ["fonts", "option", family],
		queryFn: () => getFontOptionAction(family),
		staleTime: Number.POSITIVE_INFINITY,
		enabled: family.length > 0,
	});
}
