import { z } from "zod";
import { hasUniqueValues } from "@/shared/lib/array";
import { PAGE_SLUG } from "./patterns";

export const pagesSchema = z
	.array(z.string().regex(PAGE_SLUG, "pageSlug"))
	.refine(hasUniqueValues, "pageDuplicate");
