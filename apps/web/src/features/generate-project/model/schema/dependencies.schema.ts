import { z } from "zod";
import { hasUniqueValues } from "@/shared/lib/array";
import { NPM_NAME, SEMVER } from "./patterns";

const dependencySchema = z.object({
	name: z.string().trim().regex(NPM_NAME, "npmName"),
	version: z.string().trim().regex(SEMVER, "semver"),
});

export const dependenciesSchema = z
	.array(dependencySchema)
	.refine(
		(list) => hasUniqueValues(list.map((dependency) => dependency.name)),
		"dependencyDuplicate",
	);
