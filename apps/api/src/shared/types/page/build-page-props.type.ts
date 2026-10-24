import type { PageParts } from "./page-parts.type";

export interface BuildPageProps {
	componentName: string;
	view: string;
	parts: PageParts;
}
