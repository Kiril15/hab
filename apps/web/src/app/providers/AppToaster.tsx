"use client";

import { Toaster } from "react-hot-toast";

export function AppToaster() {
	return (
		<Toaster
			position="top-center"
			toastOptions={{
				duration: 4000,
				style: {
					background: "var(--foreground)",
					color: "var(--background)",
					border: "1px solid var(--border)",
					fontSize: "14px",
					fontFamily: "var(--font-sans)",
				},
				success: {
					iconTheme: { primary: "var(--primary)", secondary: "var(--primary-foreground)" },
				},
				error: {
					iconTheme: { primary: "var(--destructive)", secondary: "#fff" },
				},
			}}
		/>
	);
}
