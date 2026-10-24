import { z } from "zod";
import { hasUniqueValues } from "@/shared/lib/array";
import { MAX_PAGES } from "../../config";
import { PAGE_SLUG } from "./patterns";

export const pagesSchema = z
	.array(z.string().regex(PAGE_SLUG, "pageSlug"))
	.max(MAX_PAGES, "pagesMax")
	.refine(hasUniqueValues, "pageDuplicate");
