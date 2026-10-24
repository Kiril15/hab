import type { OptionDefinition } from "../../options/types";

export function getAppDir(options: OptionDefinition[]): string {
	const segments = options.flatMap(({ routeSegment }) => (routeSegment ? [routeSegment] : []));

	return ["src/app", ...segments].join("/");
}
