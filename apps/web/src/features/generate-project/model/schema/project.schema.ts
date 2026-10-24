import { z } from "zod";
import { LATIN_TEXT, SITE_URL } from "./patterns";

export const projectSchema = z.object({
	projectName: z.string().trim().min(3, "min3").max(50, "max50").regex(LATIN_TEXT, "latinOnly"),
	projectDesc: z.string().trim().min(3, "min3").max(200, "max200").regex(LATIN_TEXT, "latinOnly"),
	author: z.string().trim().min(3, "min3").max(50, "max50").regex(LATIN_TEXT, "latinOnly"),
	siteUrl: z
		.string()
		.trim()
		.overwrite((value) => value.replace(/\/+$/, ""))
		.refine((value) => value === "" || SITE_URL.test(value), "siteUrl"),
});
