import { z } from "zod";
import { LATIN_TEXT } from "./patterns";

export const projectSchema = z.object({
	projectName: z.string().trim().min(3, "min3").max(50, "max50").regex(LATIN_TEXT, "latinOnly"),
	projectDesc: z.string().trim().min(3, "min3").max(200, "max200").regex(LATIN_TEXT, "latinOnly"),
	author: z.string().trim().min(3, "min3").max(50, "max50").regex(LATIN_TEXT, "latinOnly"),
});
