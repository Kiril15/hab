import { z } from "zod";
import { dependenciesSchema } from "./dependencies.schema";
import { fontsSchema } from "./fonts.schema";
import { optionsSchema } from "./options.schema";
import { pagesSchema } from "./pages.schema";
import { projectSchema } from "./project.schema";
import { themeSchema } from "./theme.schema";

export const generateProjectSchema = z.object({
	project: projectSchema,
	pages: pagesSchema,
	dependencies: dependenciesSchema,
	devDependencies: dependenciesSchema,
	theme: themeSchema,
	fonts: fontsSchema,
	options: optionsSchema,
});
