import { NextIntlClientProvider } from "next-intl";
import type { PropsWithChildren } from "react";
import { AppToaster } from "./AppToaster";
import { MotionProvider } from "./Motion.provider";
import { QueryProvider } from "./Query.provider";

export function Providers({ children }: PropsWithChildren) {
	return (
		<NextIntlClientProvider>
			<QueryProvider>
				<MotionProvider>
					{children}
					<AppToaster />
				</MotionProvider>
			</QueryProvider>
		</NextIntlClientProvider>
	);
}
