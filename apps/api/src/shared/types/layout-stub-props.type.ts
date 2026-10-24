import type { FontCode } from "./font-code.type";
import type { LayoutProvider } from "./layout-provider.type";

export interface LayoutStubProps {
	fontCode: FontCode;
	isLocalized: boolean;
	providers: LayoutProvider[];
}
