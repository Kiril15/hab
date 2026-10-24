import type { ProjectOptions } from "@repo/types";

export function getAppDir({ i18n }: ProjectOptions): string {
	return i18n ? "src/app/[locale]" : "src/app";
}
