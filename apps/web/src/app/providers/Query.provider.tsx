"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { catchError } from "@/shared/lib/error.util";

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 1000 * 60 * 2,
						gcTime: 1000 * 60 * 60,
						retry: 1,
					},
					mutations: {
						onError: (e) => toast.error(catchError(e)),
						retry: 0,
					},
				},
			}),
	);

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
