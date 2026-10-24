import { z } from "zod";
import { hasUniqueValues } from "@/shared/lib/array";
import { MAX_DEPENDENCIES } from "../../config";
import { NPM_NAME, SEMVER } from "./patterns";

const dependencySchema = z.object({
	name: z.string().trim().regex(NPM_NAME, "npmName"),
	version: z.string().trim().regex(SEMVER, "semver"),
});

export const dependenciesSchema = z
	.array(dependencySchema)
	.max(MAX_DEPENDENCIES, "dependenciesMax")
	.refine(
		(list) => hasUniqueValues(list.map((dependency) => dependency.name)),
		"dependencyDuplicate",
	);
