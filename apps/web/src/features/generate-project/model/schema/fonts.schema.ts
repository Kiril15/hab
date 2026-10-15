import { z } from "zod";

const fontSchema = z.object({
	family: z.string().min(1, "required"),
	style: z.enum(["normal", "italic"]),
	subset: z.string().min(1, "required"),
});

export const fontsSchema = z.object({
	primary: fontSchema,
	secondary: fontSchema.nullable(),
});
