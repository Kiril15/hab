import type { FontCode } from "../fonts";
import type { LayoutParts } from "./layout-parts.type";
import type { LayoutProvider } from "./layout-provider.type";

export interface BuildLayoutProps {
	fontCode: FontCode;
	parts: LayoutParts;
	providers: LayoutProvider[];
}
